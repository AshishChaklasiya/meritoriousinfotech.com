import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/metadata";

export const runtime = "edge";

/**
 * Task 5: OPEN GRAPH IMAGE (app/api/og/route.tsx)
 * Dynamically generates OG images for social sharing.
 * Improves CTR on social platforms like Twitter and LinkedIn.
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic title from query params
    const title = searchParams.get("title") || siteConfig.name;
    const description = searchParams.get("description") || siteConfig.description;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            backgroundImage: "radial-gradient(circle at 25% 25%, #1a1a1a 0%, #000 100%)",
            color: "#fff",
            padding: "40px 80px",
            textAlign: "center",
          }}
        >
          {/* Logo Area */}
          <div
            style={{
              fontSize: 32,
              fontWeight: "bold",
              marginBottom: 40,
              color: "#3b82f6", // Blue color for branding
            }}
          >
            {siteConfig.name}
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: "bold",
              lineHeight: 1.1,
              marginBottom: 20,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>

          {/* Tagline / Description */}
          <div
            style={{
              fontSize: 32,
              color: "#9ca3af",
              maxWidth: "800px",
            }}
          >
            {description}
          </div>

          {/* Decorator */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              right: 60,
              fontSize: 24,
              color: "#3b82f6",
            }}
          >
            meritoriousinfotech.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
