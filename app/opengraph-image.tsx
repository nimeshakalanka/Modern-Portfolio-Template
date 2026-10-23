import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name}, ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          color: "#fafafa",
          backgroundColor: "#09090b",
          backgroundImage:
            "radial-gradient(circle at 15% 10%, rgba(79,70,229,0.55), transparent 45%), radial-gradient(circle at 90% 90%, rgba(129,140,248,0.35), transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 88,
            height: 88,
            borderRadius: 44,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fafafa",
            color: "#09090b",
            fontSize: 34,
            fontWeight: 800,
          }}
        >
          {profile.initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, fontWeight: 800, letterSpacing: -3, lineHeight: 1 }}>
            {profile.name}
            <span style={{ color: "#818cf8" }}>.</span>
          </div>
          <div style={{ marginTop: 24, fontSize: 38, color: "#a1a1aa" }}>{profile.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
