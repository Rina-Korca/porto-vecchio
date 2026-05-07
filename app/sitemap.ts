import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/menu", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/bestellen", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/impressum", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/datenschutz", priority: 0.3, changeFrequency: "yearly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return routes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
