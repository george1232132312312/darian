import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { CONTACT, SITE_URL } from "./site-config";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const IN_CITY = CONTACT.city ? ` din ${CONTACT.city}` : "";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "fíori. — cofetărie artizanală | prăjituri, cookies & dulciuri",
  description: `fíori. (fiori) este un atelier artizanal de dulciuri${IN_CITY}: prăjituri, eclere, cookies și marshmallows. Făcute cu drag, în serii mici.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "fíori. — cofetărie artizanală",
    description:
      "Prăjituri, cookies și marshmallows făcute cu drag, în serii mici.",
    url: "/",
    siteName: "fíori.",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Eclere și choux-uri fíori.",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#33523f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={poppins.variable}>
      <body className="font-sans bg-cream text-cocoa antialiased">
        {children}
      </body>
    </html>
  );
}
