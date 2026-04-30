import type { Metadata, Viewport } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Ristorante Bonfini | Fine Italian Dining in Berlin",
  description:
    "Erleben Sie authentische italienische Küche im Herzen von Berlin. Ristorante Bonfini bietet exquisite Gerichte, erlesene Weine und ein unvergessliches Ambiente seit 2008.",
  generator: "v0.app",
  keywords: [
    "Restaurant",
    "Berlin",
    "Italienisch",
    "Fine Dining",
    "Pasta",
    "Pizza",
    "Wein",
    "Bonfini",
    "Italian Restaurant Berlin",
  ],
  authors: [{ name: "Ristorante Bonfini" }],
  openGraph: {
    title: "Ristorante Bonfini | Fine Italian Dining in Berlin",
    description:
      "Erleben Sie authentische italienische Küche im Herzen von Berlin.",
    type: "website",
    locale: "de_DE",
  },
  icons: {
    icon: [
      {
        url: "/images/logo/favicon.png",
        sizes: "192x192",
      },
      {
        url: "/images/logo/favicon.png",
        sizes: "256x256",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0b090a" },
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
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
