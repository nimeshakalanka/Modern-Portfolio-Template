import html2canvas from "html2canvas-pro";
import { Container, type GlassShape } from "./container";

export type { GlassShape };

Container.html2canvas = html2canvas;

export interface GlassOptions {
  shape: GlassShape;
  radius: number;
  tintOpacity: number;
  onReady: () => void;
}

export interface GlassHandle {
  setTintOpacity: (value: number) => void;
  destroy: () => void;
}

let recaptureTimer: ReturnType<typeof setTimeout> | undefined;

/** Debounced refresh of the shared page snapshot, e.g. after a theme, route or size change. */
export function requestRecapture(delay = 450): void {
  clearTimeout(recaptureTimer);
  recaptureTimer = setTimeout(() => Container.capture(), delay);
}

const onWindowResize = () => requestRecapture(600);

/** Mounts a liquid glass canvas filling `host` (which must be positioned). */
export function createGlass(host: HTMLElement, options: GlassOptions): GlassHandle {
  const container = new Container({
    type: options.shape,
    borderRadius: options.radius,
    tintOpacity: options.tintOpacity,
    onReady: options.onReady,
  });
  host.appendChild(container.element);
  container.updateSizeFromDOM();

  const resizeObserver = new ResizeObserver(() => container.updateSizeFromDOM());
  resizeObserver.observe(host);
  if (Container.instances.length === 1) window.addEventListener("resize", onWindowResize);

  return {
    setTintOpacity: (value) => container.setTintOpacity(value),
    destroy: () => {
      resizeObserver.disconnect();
      container.destroy();
      if (Container.instances.length === 0) {
        window.removeEventListener("resize", onWindowResize);
        clearTimeout(recaptureTimer);
      }
    },
  };
}
