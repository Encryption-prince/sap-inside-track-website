// src/app/layout.js
import { Inter, Montserrat } from "next/font/google"; // Import the fonts
import "./globals.css";

// 1. Define Inter for body/nav text
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter', // Create a CSS variable
});

// 2. Define Montserrat for headings
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ['700'], // We only need the bold weight for headings
  variable: '--font-montserrat', // Create a CSS variable
});

export const metadata = {
  title: "SAP Inside Track Kolkata",
  description: "Empowering Business Together with SAP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* 3. Apply the variables to the body tag */}
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}