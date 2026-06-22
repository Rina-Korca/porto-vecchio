import type { Metadata } from "next"
import { companyInfo, openingSchedule } from "@/lib/company-info"

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://example.com"

export const seoConfig = {
  siteUrl: rawSiteUrl.replace(/\/$/, ""),
  siteName: companyInfo.name,
  defaultTitle: "Porto Vecchio | Ristorante & Pizzeria in Speyer",
  defaultDescription:
    "Porto Vecchio in Speyer am Rhein: Holzofen-Pizza, Pasta, Fleisch- und Fischgerichte, italienisch-mediterrane Küche und telefonische Reservierung.",
  locale: "de_DE",
  language: "de-DE",
  themeColor: "#006466",
  googleAnalyticsId:
    process.env.NEXT_PUBLIC_GA_ID || process.env.GOOGLE_ANALYTICS_ID || "G-JSFWX3FT71",
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION ||
    "PASTE_VERIFICATION_CODE_HERE",
  defaultOgImage: {
    url: "/images/porto/dining-terrace.jpg",
    width: 2304,
    height: 1536,
    alt: "Holzofen-Pizza im Porto Vecchio in Speyer",
  },
}

export function absoluteUrl(path = "/") {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  return `${seoConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

const indexableRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
}

const noIndexRobots: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
}

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: typeof seoConfig.defaultOgImage
  noIndex?: boolean
  absoluteTitle?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  image = seoConfig.defaultOgImage,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${seoConfig.siteName}`

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: {
        [seoConfig.language]: path,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: seoConfig.siteName,
      images: [image],
      locale: seoConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    robots: noIndex ? noIndexRobots : indexableRobots,
  }
}

export function createWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: seoConfig.siteUrl,
    name: seoConfig.siteName,
    description: seoConfig.defaultDescription,
    inLanguage: seoConfig.language,
    publisher: {
      "@id": absoluteUrl("/#restaurant"),
    },
  }
}

export function createRestaurantJsonLd() {
  const sameAs = [
    companyInfo.instagramHref,
    companyInfo.facebookHref,
    companyInfo.googleProfileHref,
  ].filter(Boolean)

  const openingHoursSpecification = openingSchedule.flatMap((entry) =>
    entry.servicePeriods.map(({ opensAt, closesAt }) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: opensAt,
      closes: closesAt === "24:00" ? "23:59" : closesAt,
    })),
  )

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": absoluteUrl("/#restaurant"),
    name: companyInfo.name,
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    image: absoluteUrl(seoConfig.defaultOgImage.url),
    logo: absoluteUrl("/images/porto/logo-white.png"),
    telephone: companyInfo.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: companyInfo.addressLine1,
      postalCode: "67346",
      addressLocality: "Speyer",
      addressCountry: "DE",
    },
    priceRange: companyInfo.priceRange,
    servesCuisine: ["Italian", "Mediterranean", "Pizza"],
    acceptsReservations: true,
    menu: absoluteUrl(companyInfo.menuHref),
    sameAs,
    openingHoursSpecification,
  }
}

export function createBreadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
