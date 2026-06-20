import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Get site configuration from environment or defaults
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bongpuffstream.vercel.app";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "bongpuffstream";
const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Stream your favorite international and local live TV channels smoothly without lag on bongpuffstream.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${siteName} | Watch Live TV & Sports Streaming Free`,
  description: siteDescription,
  keywords: [
    siteName,
    "live tv",
    "free streaming",
    "m3u8 player",
    "smooth live stream",
    "iptv",
    "live channels",
    "sports streaming",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
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
  openGraph: {
    title: `${siteName} | Watch Live TV & Sports Streaming Free`,
    description: siteDescription,
    url: siteUrl,
    siteName: siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | Watch Live TV & Sports Streaming Free`,
    description: siteDescription,
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "89-0ypn5DvdaPjOax57BILkjT1IyakZXHctJQsWhvhI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f]">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
