import type { MetadataRoute } from "next"
import { seoConfig } from "@/lib/seo"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: seoConfig.siteName,
    short_name: "Porto Vecchio",
    description: seoConfig.defaultDescription,
    lang: seoConfig.language,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f4f8f8",
    theme_color: seoConfig.themeColor,
    icons: [
      {
        src: "/images/logo/favicon.png",
        sizes: "1536x1024",
        type: "image/png",
      },
    ],
  }
}
