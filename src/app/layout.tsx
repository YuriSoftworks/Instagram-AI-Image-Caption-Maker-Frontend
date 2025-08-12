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

const siteName = "Instagram AI Image Caption Maker";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteDescription =
  "Privacy-first AI Instagram caption generator. Upload an image and get creative, human-like, SEO-optimized captions powered by BLIP + Gemini/Gemma.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} – AI Instagram Caption Generator (Frontend)`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    url: siteUrl,
    title: `${siteName} – AI Instagram Caption Generator`,
    description: siteDescription,
    images: [
      {
        url: "/vercel.svg",
        width: 1200,
        height: 630,
        alt: "Instagram AI Caption Generator",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} – AI Instagram Caption Generator`,
    description: siteDescription,
    images: ["/vercel.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
  keywords: [
    "Instagram caption generator",
    "AI Instagram captions",
    "image captioning",
    "BLIP",
    "Gemini",
    "Gemma",
    "Next.js",
    "React",
    "Tailwind CSS",
    "FastAPI",
  ],
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
