import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/google-analytics";
import { JsonLd } from "@/components/json-ld";
import {
  createRestaurantJsonLd,
  createWebsiteJsonLd,
  seoConfig,
} from "@/lib/seo";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  applicationName: seoConfig.siteName,
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.defaultDescription,
  keywords: [
    "Restaurant",
    "Speyer",
    "Italienisch",
    "Ristorante",
    "Pizzeria",
    "Pasta",
    "Pizza",
    "Holzofen Pizza",
    "Rheinpromenade",
    "Porto Vecchio",
    "Italian Restaurant Speyer",
  ],
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
  alternates: {
    canonical: "/",
    languages: {
      [seoConfig.language]: "/",
    },
  },
  openGraph: {
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    url: "/",
    siteName: seoConfig.siteName,
    images: [seoConfig.defaultOgImage],
    type: "website",
    locale: seoConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.defaultOgImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: seoConfig.googleSiteVerification,
  },
  icons: {
    icon: [
      {
        url: "/images/logo/favicon.png",
        sizes: "1536x1024",
        type: "image/png",
      },
    ],
    shortcut: "/images/logo/favicon.png",
    apple: [
      {
        url: "/images/logo/favicon.png",
        sizes: "1536x1024",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f8f8" },
    { media: "(prefers-color-scheme: dark)", color: "#212f45" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${lato.variable} bg-smoke`}
    >
      <body className="font-sans antialiased selection:bg-mahogany selection:text-white">
        <JsonLd data={[createWebsiteJsonLd(), createRestaurantJsonLd()]} />
        {children}
        <GoogleAnalytics />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
