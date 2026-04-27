import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DOMAIN, SITE_BASE_PATH } from "@/config/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Salmorejo Tech 2026 | El Evento Tecnológico de Córdoba",
    template: "%s | Salmorejo Tech 2026",
  },
  description:
    "Únete a la mayor cita tecnológica de Córdoba. Networking, ponencias de primer nivel y mucho salmorejo. ¡Call for Papers disponible!",

  // --- 1. Palabras clave y Autor ---
  keywords: [
    "Salmorejo Tech",
    "Evento Tecnológico",
    "Córdoba",
    "Programación",
    "Networking",
    "Software Libre",
    "Aula Software Libre",
  ],
  authors: [
    {
      name: "Aula de Software Libre",
      url: "https://www.uco.es/aulasoftwarelibre/",
    },
  ],
  creator: "Aula de Software Libre",

  // --- 2. Robots y Canónica ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_BASE_PATH,
  },

  // --- Open Graph (Facebook, LinkedIn, WhatsApp, etc.) ---
  openGraph: {
    title: "Salmorejo Tech 2026 | El Evento Tecnológico de Córdoba",
    description:
      "Únete a la mayor cita tecnológica de Córdoba. Networking, ponencias de primer nivel y mucho salmorejo. ¡Call for Papers disponible!",
    url: SITE_BASE_PATH,
    siteName: "Salmorejo Tech",
    locale: "es_ES",
    type: "website",
  },

  // --- Twitter Card ---
  twitter: {
    card: "summary_large_image",
    title: "Salmorejo Tech 2026 | El Evento Tecnológico de Córdoba",
    description:
      "Únete a la mayor cita tecnológica de Córdoba. Networking, ponencias de primer nivel y mucho salmorejo. ¡Call for Papers disponible!",
    site: "@AulaSL",
    creator: "@AulaSL",
  },

  verification: {
    google: "TSaySf4j8921ib-uPMjMx7LCvL9ykC1a-P29LPVqfMs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Aula de Software Libre",
              url: "https://www.uco.es/aulasoftwarelibre/",
              logo: "https://salmorejo.tech/2026/opengraph-image.webp",
              sameAs: [
                "https://twitter.com/AulaSL",
                "https://www.instagram.com/aulasoftwarelibre/",
                "https://www.linkedin.com/company/aulasoftwarelibre",
                "https://www.facebook.com/AulaSoftwareLibre/",
              ],
              description:
                "Unión de estudiantes de la Universidad de Córdoba dedicada a la difusión del conocimiento libre y organizadora del Salmorejo Tech.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
