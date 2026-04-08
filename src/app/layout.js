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
  title: "SAP Inside Track Kolkata",
  description: "Empowering Business Together with SAP",
  icons: {
    icon: '/sap-logo.png',
  },
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