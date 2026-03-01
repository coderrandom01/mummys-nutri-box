import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mummy's Nutri Basket",
  description: "Premium dry fruits & seeds for healthy family nutrition.",
  openGraph: {
    title: "Mummy's Nutri Basket",
    description: "Healthy Choices, Mummy's Care.",
    url: "https://mummysnutribasket.com/",
    siteName: "Mummy's Nutri Basket",
    images: [
      {
        url: "https://4ne9fphotqlkpkiu.public.blob.vercel-storage.com/mummys-nutri-box-logo.webp",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
