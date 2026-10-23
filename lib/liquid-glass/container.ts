/*
 * Liquid glass renderer (adapted from liquid-glass-js, MIT License).
 */
import type html2canvasFn from "html2canvas-pro";

export type GlassShape = "rounded" | "pill" | "circle";

export interface ContainerOptions {
  borderRadius?: number;
  type?: GlassShape;
  tintOpacity?: number;
  onReady?: () => void;
}

interface GlRefs {
  gl: WebGLRenderingContext;
  texture: WebGLTexture;
  resolutionLoc: WebGLUniformLocation | null;
  textureSizeLoc: WebGLUniformLocation | null;
  scrollYLoc: WebGLUniformLocation | null;
  pageHeightLoc: WebGLUniformLocation | null;
  viewportHeightLoc: WebGLUniformLocation | null;
  borderRadiusLoc: WebGLUniformLocation | null;
  containerPositionLoc: WebGLUniformLocation | null;
  tintOpacityLoc: WebGLUniformLocation | null;
}

const PARAMS = {
  blurRadius: 5.0,
  edgeIntensity: 0.01,
  rimIntensity: 0.05,
  baseIntensity: 0.01,
  edgeDistance: 0.15,
  rimDistance: 0.8,
  baseDistance: 0.1,
  cornerBoost: 0.02,
  rippleEffect: 0.1,
};

const SNAPSHOT_SCALE = 0.5;

const VERTEX_SHADER = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;
    varying vec2 v_texcoord;

    void main() {
      gl_Position = vec4(a_position, 0, 1);
      v_texcoord = a_texcoord;
    }
  `;

const FRAGMENT_SHADER = `
    precision mediump float;
    uniform sampler2D u_image;
    uniform vec2 u_resolution;
      uniform vec2 u_textureSize;
      uniform float u_scrollY;
      uniform float u_pageHeight;
      uniform float u_viewportHeight;
      uniform float u_blurRadius;
      uniform float u_borderRadius;
      uniform vec2 u_containerPosition;
      uniform float u_warp;
      uniform float u_edgeIntensity;
      uniform float u_rimIntensity;
      uniform float u_baseIntensity;
      uniform float u_edgeDistance;
      uniform float u_rimDistance;
      uniform float u_baseDistance;
      uniform float u_cornerBoost;
      uniform float u_rippleEffect;
      uniform float u_tintOpacity;
    varying vec2 v_texcoord;

      // Function to calculate distance from rounded rectangle edge
      float roundedRectDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        vec2 toCorner = abs(pixelCoord - center) - (center - radius);
        float outsideCorner = length(max(toCorner, 0.0));
        float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
        return (outsideCorner + insideCorner - radius);
      }
      
      // Function to calculate distance from circle edge (negative inside, positive outside)
      float circleDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = vec2(0.5, 0.5);
        vec2 pixelCoord = coord * size;
        vec2 centerPixel = center * size;
        float distFromCenter = length(pixelCoord - centerPixel);
        return distFromCenter - radius;
      }
      
      // Check if this is a pill (border radius is approximately 50% of height AND width > height)
      bool isPill(vec2 size, float radius) {
        float heightRatioDiff = abs(radius - size.y * 0.5);
        bool radiusMatchesHeight = heightRatioDiff < 2.0;
        bool isWiderThanTall = size.x > size.y + 4.0; // Must be significantly wider
        return radiusMatchesHeight && isWiderThanTall;
      }
      
      // Check if this is a circle (border radius is approximately 50% of smaller dimension AND roughly square)
      bool isCircle(vec2 size, float radius) {
        float minDim = min(size.x, size.y);
        bool radiusMatchesMinDim = abs(radius - minDim * 0.5) < 1.0;
        bool isRoughlySquare = abs(size.x - size.y) < 4.0; // Width and height are similar
        return radiusMatchesMinDim && isRoughlySquare;
      }
      
      // Function to calculate distance from pill edge (capsule shape)
      float pillDistance(vec2 coord, vec2 size, float radius) {
        vec2 center = size * 0.5;
        vec2 pixelCoord = coord * size;
        
        // Proper capsule: line segment with radius
        // The capsule axis runs horizontally from (radius, center.y) to (size.x - radius, center.y)
        vec2 capsuleStart = vec2(radius, center.y);
        vec2 capsuleEnd = vec2(size.x - radius, center.y);
        
        // Project point onto the capsule axis (line segment)
        vec2 capsuleAxis = capsuleEnd - capsuleStart;
        float capsuleLength = length(capsuleAxis);
        
        if (capsuleLength > 0.0) {
          vec2 toPoint = pixelCoord - capsuleStart;
          float t = clamp(dot(toPoint, capsuleAxis) / dot(capsuleAxis, capsuleAxis), 0.0, 1.0);
          vec2 closestPointOnAxis = capsuleStart + t * capsuleAxis;
          return length(pixelCoord - closestPointOnAxis) - radius;
        } else {
          // Degenerate case: just a circle
          return length(pixelCoord - center) - radius;
        }
      }

    void main() {
        vec2 coord = v_texcoord;
        
        // Calculate which area of the page should be visible through the container
        float scrollY = u_scrollY;
        vec2 containerSize = u_resolution;
        vec2 textureSize = u_textureSize;
        
        // Container position in viewport coordinates
        vec2 containerCenter = u_containerPosition + vec2(0.0, scrollY);
        
        // Convert container coordinates to page coordinates
        vec2 containerOffset = (coord - 0.5) * containerSize;
        vec2 pagePixel = containerCenter + containerOffset;
        
        // Convert to texture coordinate (0 to 1)
        vec2 textureCoord = pagePixel / textureSize;
        
        // Glass refraction effects
        float distFromEdgeShape;
        vec2 shapeNormal; // Normal vector pointing away from shape surface
        
        if (isPill(u_resolution, u_borderRadius)) {
          distFromEdgeShape = -pillDistance(coord, u_resolution, u_borderRadius);
          
          // Calculate normal for pill shape
          vec2 center = vec2(0.5, 0.5);
          vec2 pixelCoord = coord * u_resolution;
          vec2 capsuleStart = vec2(u_borderRadius, center.y * u_resolution.y);
          vec2 capsuleEnd = vec2(u_resolution.x - u_borderRadius, center.y * u_resolution.y);
          vec2 capsuleAxis = capsuleEnd - capsuleStart;
          float capsuleLength = length(capsuleAxis);
          
          if (capsuleLength > 0.0) {
            vec2 toPoint = pixelCoord - capsuleStart;
            float t = clamp(dot(toPoint, capsuleAxis) / dot(capsuleAxis, capsuleAxis), 0.0, 1.0);
            vec2 closestPointOnAxis = capsuleStart + t * capsuleAxis;
            vec2 normalDir = pixelCoord - closestPointOnAxis;
            shapeNormal = length(normalDir) > 0.0 ? normalize(normalDir) : vec2(0.0, 1.0);
          } else {
            shapeNormal = normalize(coord - center);
          }
        } else if (isCircle(u_resolution, u_borderRadius)) {
          distFromEdgeShape = -circleDistance(coord, u_resolution, u_borderRadius);
          vec2 center = vec2(0.5, 0.5);
          shapeNormal = normalize(coord - center);
        } else {
          distFromEdgeShape = -roundedRectDistance(coord, u_resolution, u_borderRadius);
      vec2 center = vec2(0.5, 0.5);
          shapeNormal = normalize(coord - center);
        }
        distFromEdgeShape = max(distFromEdgeShape, 0.0);
        
        float distFromLeft = coord.x;
        float distFromRight = 1.0 - coord.x;
        float distFromTop = coord.y;
        float distFromBottom = 1.0 - coord.y;
        float distFromEdge = distFromEdgeShape / min(u_resolution.x, u_resolution.y);
        
        // Smooth glass refraction using shape-aware normal
        float normalizedDistance = distFromEdge * min(u_resolution.x, u_resolution.y);
        float baseIntensity = 1.0 - exp(-normalizedDistance * u_baseDistance);
        float edgeIntensity = exp(-normalizedDistance * u_edgeDistance);
        float rimIntensity = exp(-normalizedDistance * u_rimDistance);
        
        // Apply center warping only if warp is enabled, keep edge and rim effects always
        float baseComponent = u_warp > 0.5 ? baseIntensity * u_baseIntensity : 0.0;
        float totalIntensity = baseComponent + edgeIntensity * u_edgeIntensity + rimIntensity * u_rimIntensity;
        
        vec2 baseRefraction = shapeNormal * totalIntensity;
        
        float cornerProximityX = min(distFromLeft, distFromRight);
        float cornerProximityY = min(distFromTop, distFromBottom);
        float cornerDistance = max(cornerProximityX, cornerProximityY);
        float cornerNormalized = cornerDistance * min(u_resolution.x, u_resolution.y);
        
        float cornerBoost = exp(-cornerNormalized * 0.3) * u_cornerBoost;
        vec2 cornerRefraction = shapeNormal * cornerBoost;
        
        vec2 perpendicular = vec2(-shapeNormal.y, shapeNormal.x);
        float rippleEffect = sin(distFromEdge * 25.0) * u_rippleEffect * rimIntensity;
        vec2 textureRefraction = perpendicular * rippleEffect;
        
        vec2 totalRefraction = baseRefraction + cornerRefraction + textureRefraction;
        textureCoord += totalRefraction;
        
        // Gaussian blur
        vec4 color = vec4(0.0);
        vec2 texelSize = 1.0 / u_textureSize;
        float sigma = u_blurRadius / 2.0;
        vec2 blurStep = texelSize * sigma;
        
        float totalWeight = 0.0;
        
        for(float i = -6.0; i <= 6.0; i += 1.0) {
          for(float j = -6.0; j <= 6.0; j += 1.0) {
            float distance = length(vec2(i, j));
            if(distance > 6.0) continue;
            
            float weight = exp(-(distance * distance) / (2.0 * sigma * sigma));
            
            vec2 offset = vec2(i, j) * blurStep;
            color += texture2D(u_image, textureCoord + offset) * weight;
            totalWeight += weight;
          }
        }
        
        color /= totalWeight;
        
        // Simple vertical gradient
        float gradientPosition = coord.y;
        vec3 topTint = vec3(1.0, 1.0, 1.0);
        vec3 bottomTint = vec3(0.7, 0.7, 0.7);
        vec3 gradientTint = mix(topTint, bottomTint, gradientPosition);
        vec3 tintedColor = mix(color.rgb, gradientTint, u_tintOpacity);
        color = vec4(tintedColor, color.a);
        
        // Sampled gradient
        vec2 viewportCenter = containerCenter;
        float topY = (viewportCenter.y - containerSize.y * 0.4) / textureSize.y;
        float midY = viewportCenter.y / textureSize.y;
        float bottomY = (viewportCenter.y + containerSize.y * 0.4) / textureSize.y;
        
        vec3 topColor = vec3(0.0);
        vec3 midColor = vec3(0.0);
        vec3 bottomColor = vec3(0.0);
        
        float sampleCount = 0.0;
        for(float x = 0.0; x < 1.0; x += 0.05) {
          for(float yOffset = -5.0; yOffset <= 5.0; yOffset += 1.0) {
            vec2 topSample = vec2(x, topY + yOffset * texelSize.y);
            vec2 midSample = vec2(x, midY + yOffset * texelSize.y);
            vec2 bottomSample = vec2(x, bottomY + yOffset * texelSize.y);
            
            topColor += texture2D(u_image, topSample).rgb;
            midColor += texture2D(u_image, midSample).rgb;
            bottomColor += texture2D(u_image, bottomSample).rgb;
            sampleCount += 1.0;
          }
        }
        
        topColor /= sampleCount;
        midColor /= sampleCount;
        bottomColor /= sampleCount;
        
        vec3 sampledGradient;
        if (gradientPosition < 0.1) {
          sampledGradient = topColor;
        } else if (gradientPosition > 0.9) {
          sampledGradient = bottomColor;
        } else {
          float transitionPos = (gradientPosition - 0.1) / 0.8;
          if (transitionPos < 0.5) {
            float t = transitionPos * 2.0;
            sampledGradient = mix(topColor, midColor, t);
          } else {
            float t = (transitionPos - 0.5) * 2.0;
            sampledGradient = mix(midColor, bottomColor, t);
          }
        }
        
        vec3 finalTinted = mix(color.rgb, sampledGradient, u_tintOpacity * 0.3);
        color = vec4(finalTinted, color.a);
        
        // Shape mask (rounded rectangle, circle, or pill)
        float maskDistance;
        if (isPill(u_resolution, u_borderRadius)) {
          maskDistance = pillDistance(coord, u_resolution, u_borderRadius);
        } else if (isCircle(u_resolution, u_borderRadius)) {
          maskDistance = circleDistance(coord, u_resolution, u_borderRadius);
        } else {
          maskDistance = roundedRectDistance(coord, u_resolution, u_borderRadius);
        }
        float mask = 1.0 - smoothstep(-1.0, 1.0, maskDistance);
        
        gl_FragColor = vec4(color.rgb, mask);
      }
    `;

export class Container {
  static instances: Container[] = [];
  static pageSnapshot: HTMLCanvasElement | null = null;
  static html2canvas: typeof html2canvasFn | null = null;
  private static isCapturing = false;
  private static captureQueued = false;

  width = 0;
  height = 0;
  borderRadius: number;
  readonly type: GlassShape;
  tintOpacity: number;
  readonly element: HTMLDivElement;
  readonly canvas: HTMLCanvasElement;
  private readonly gl: WebGLRenderingContext | null;
  private refs: GlRefs | null = null;
  private readonly onReady?: () => void;
  private destroyed = false;
  private sizeFrame = 0;
  private readonly handleScroll = () => this.render();

  constructor(options: ContainerOptions = {}) {
    this.borderRadius = options.borderRadius ?? 48;
    this.type = options.type ?? "rounded";
    this.tintOpacity = options.tintOpacity ?? 0.2;
    this.onReady = options.onReady;

    this.element = document.createElement("div");
    this.element.style.cssText = "position:absolute;inset:0;";
    this.element.style.borderRadius = `${this.borderRadius}px`;

    this.canvas = document.createElement("canvas");
    this.canvas.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;";
    this.canvas.style.borderRadius = `${this.borderRadius}px`;
    this.element.appendChild(this.canvas);

    this.gl = this.canvas.getContext("webgl", { preserveDrawingBuffer: true });

    Container.instances.push(this);
    this.updateSizeFromDOM();

    if (Container.pageSnapshot) {
      this.setupShader(Container.pageSnapshot);
    } else {
      Container.capture();
    }
  }

  static capture(): void {
    const html2canvas = Container.html2canvas;
    if (!html2canvas || Container.instances.length === 0) return;
    if (Container.isCapturing) {
      Container.captureQueued = true;
      return;
    }
    Container.isCapturing = true;

    html2canvas(document.body, {
      scale: SNAPSHOT_SCALE,
      useCORS: true,
      backgroundColor: null,
      logging: false,
      onclone: (doc) => {
        const style = doc.createElement("style");
        style.textContent =
          "[data-glass]{visibility:hidden!important}*,*::before,*::after{animation:none!important;transition:none!important}";
        doc.head.appendChild(style);
        doc.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      },
    })
      .then((snapshot) => {
        Container.pageSnapshot = snapshot;
        for (const instance of Container.instances) {
          if (instance.refs) instance.updateTexture(snapshot);
          else instance.setupShader(snapshot);
        }
      })
      .catch(() => {})
      .finally(() => {
        Container.isCapturing = false;
        if (Container.captureQueued) {
          Container.captureQueued = false;
          Container.capture();
        }
      });
  }

  updateSizeFromDOM(): void {
    cancelAnimationFrame(this.sizeFrame);
    this.sizeFrame = requestAnimationFrame(() => {
      if (this.destroyed) return;
      const rect = this.element.getBoundingClientRect();
      let newWidth = Math.ceil(rect.width);
      let newHeight = Math.ceil(rect.height);

      if (this.type === "circle") {
        const size = Math.max(newWidth, newHeight);
        newWidth = size;
        newHeight = size;
        this.borderRadius = size / 2;
      } else if (this.type === "pill") {
        this.borderRadius = newHeight / 2;
      }
      this.element.style.borderRadius = `${this.borderRadius}px`;

      if (newWidth === this.width && newHeight === this.height) return;
      this.width = newWidth;
      this.height = newHeight;

      this.canvas.width = newWidth;
      this.canvas.height = newHeight;
      this.canvas.style.borderRadius = `${this.borderRadius}px`;

      if (this.refs) {
        const { gl } = this.refs;
        gl.viewport(0, 0, newWidth, newHeight);
        gl.uniform2f(this.refs.resolutionLoc, newWidth, newHeight);
        gl.uniform1f(this.refs.borderRadiusLoc, this.borderRadius);
        this.render();
      }
    });
  }

  setTintOpacity(value: number): void {
    this.tintOpacity = value;
    if (!this.refs) return;
    this.refs.gl.uniform1f(this.refs.tintOpacityLoc, value);
    this.render();
  }

  render(): void {
    const refs = this.refs;
    if (!refs || this.destroyed) return;
    const { gl } = refs;
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(refs.scrollYLoc, window.scrollY);
    const rect = this.canvas.getBoundingClientRect();
    gl.uniform2f(refs.containerPositionLoc, rect.left + rect.width / 2, rect.top + rect.height / 2);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.sizeFrame);
    window.removeEventListener("scroll", this.handleScroll);
    this.gl?.getExtension("WEBGL_lose_context")?.loseContext();
    this.refs = null;
    this.element.remove();
    Container.instances = Container.instances.filter((instance) => instance !== this);
    if (Container.instances.length === 0) Container.pageSnapshot = null;
  }

  private fitsTexture(snapshot: HTMLCanvasElement): boolean {
    if (!this.gl) return false;
    const max = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE) as number;
    return snapshot.width <= max && snapshot.height <= max;
  }

  private updateTexture(snapshot: HTMLCanvasElement): void {
    const refs = this.refs;
    if (!refs || !this.fitsTexture(snapshot)) return;
    const { gl } = refs;
    gl.bindTexture(gl.TEXTURE_2D, refs.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, snapshot);
    gl.uniform2f(refs.textureSizeLoc, snapshot.width / SNAPSHOT_SCALE, snapshot.height / SNAPSHOT_SCALE);
    gl.uniform1f(refs.pageHeightLoc, document.documentElement.scrollHeight);
    gl.uniform1f(refs.viewportHeightLoc, window.innerHeight);
    this.render();
  }

  private setupShader(snapshot: HTMLCanvasElement): void {
    const gl = this.gl;
    if (!gl || this.destroyed || !this.fitsTexture(snapshot)) return;

    const program = this.createProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
    if (!program) return;
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const texcoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]), gl.STATIC_DRAW);
    const texcoordLoc = gl.getAttribLocation(program, "a_texcoord");
    gl.enableVertexAttribArray(texcoordLoc);
    gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    if (!texture) return;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, snapshot);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    const loc = (name: string) => gl.getUniformLocation(program, name);
    this.refs = {
      gl,
      texture,
      resolutionLoc: loc("u_resolution"),
      textureSizeLoc: loc("u_textureSize"),
      scrollYLoc: loc("u_scrollY"),
      pageHeightLoc: loc("u_pageHeight"),
      viewportHeightLoc: loc("u_viewportHeight"),
      borderRadiusLoc: loc("u_borderRadius"),
      containerPositionLoc: loc("u_containerPosition"),
      tintOpacityLoc: loc("u_tintOpacity"),
    };

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);

    gl.uniform1i(loc("u_image"), 0);
    gl.uniform2f(this.refs.resolutionLoc, this.canvas.width, this.canvas.height);
    gl.uniform2f(this.refs.textureSizeLoc, snapshot.width / SNAPSHOT_SCALE, snapshot.height / SNAPSHOT_SCALE);
    gl.uniform1f(this.refs.borderRadiusLoc, this.borderRadius);
    gl.uniform1f(this.refs.tintOpacityLoc, this.tintOpacity);
    gl.uniform1f(this.refs.pageHeightLoc, document.documentElement.scrollHeight);
    gl.uniform1f(this.refs.viewportHeightLoc, window.innerHeight);
    gl.uniform1f(loc("u_blurRadius"), PARAMS.blurRadius);
    gl.uniform1f(loc("u_warp"), 0);
    gl.uniform1f(loc("u_edgeIntensity"), PARAMS.edgeIntensity);
    gl.uniform1f(loc("u_rimIntensity"), PARAMS.rimIntensity);
    gl.uniform1f(loc("u_baseIntensity"), PARAMS.baseIntensity);
    gl.uniform1f(loc("u_edgeDistance"), PARAMS.edgeDistance);
    gl.uniform1f(loc("u_rimDistance"), PARAMS.rimDistance);
    gl.uniform1f(loc("u_baseDistance"), PARAMS.baseDistance);
    gl.uniform1f(loc("u_cornerBoost"), PARAMS.cornerBoost);
    gl.uniform1f(loc("u_rippleEffect"), PARAMS.rippleEffect);

    this.render();
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.onReady?.();
  }

  private createProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
    const vs = this.compileShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = this.compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    if (!program) return null;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
  }

  private compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  }
}
