"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { seoConfig } from "@/lib/seo"
import { hasAnalyticsConsent } from "@/components/cookie-consent"

export function GoogleAnalytics() {
  const gaId = seoConfig.googleAnalyticsId
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    setConsented(hasAnalyticsConsent())
    const handler = () => setConsented(hasAnalyticsConsent())
    window.addEventListener("cookie-consent-updated", handler)
    return () => window.removeEventListener("cookie-consent-updated", handler)
  }, [])

  if (process.env.NODE_ENV !== "production" || !gaId || !consented) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${JSON.stringify(gaId)}, { anonymize_ip: true });
          `,
        }}
      />
    </>
  )
}
