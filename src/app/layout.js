// src/app/layout.js
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['700'],
  variable: '--font-montserrat',
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ['400'],
  variable: '--font-bebas',
});

export const metadata = {
  title: "SAP Inside Track Kolkata 2026 | Innovate Connect Learn",
  description: "SAP Inside Track Kolkata is a community-driven event bringing together SAP professionals, developers, and enthusiasts for knowledge sharing, networking, and real-world SAP insights.",
  keywords: ["SAP Inside Track", "SAP Kolkata", "SAP community", "SAP BTP", "SAP developers", "SITKOLKATA", "SAP 2026", "SAP event India"],
  authors: [{ name: "SAP Inside Track Kolkata" }],
  metadataBase: new URL("https://www.sitkolkata.org"),
  openGraph: {
    title: "SAP Inside Track Kolkata 2026",
    description: "Join the SAP community in Kolkata — learn from experts, connect with professionals, and explore the SAP ecosystem.",
    url: "https://www.sitkolkata.org",
    siteName: "SAP Inside Track Kolkata",
    images: [
      {
        url: "/sap-logo.png",
        width: 800,
        height: 600,
        alt: "SAP Inside Track Kolkata",
      },
    ],
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: {
    google: "_ChWwhrHMEEgkwucDCFrxnlukdyqTf2u-0-JQay_HbE",
  },
  icons: { icon: "/icon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} ${bebasNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}