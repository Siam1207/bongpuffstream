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

export const metadata: Metadata = {
  metadataBase: new URL("https://bongpuffstream.com"),
  title: "bongpuffstream | Watch Live TV & Sports Streaming Free",
  description:
    "Stream your favorite international and local live TV channels smoothly without lag on bongpuffstream.",
  keywords: [
    "bongpuffstream",
    "live tv",
    "free streaming",
    "m3u8 player",
    "smooth live stream",
    "iptv",
    "live channels",
    "sports streaming",
  ],
  authors: [{ name: "bongpuffstream", url: "https://bongpuffstream.com" }],
  creator: "bongpuffstream",
  publisher: "bongpuffstream",
  applicationName: "bongpuffstream",
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
    title: "bongpuffstream | Watch Live TV & Sports Streaming Free",
    description:
      "Stream your favorite international and local live TV channels smoothly without lag on bongpuffstream.",
    url: "https://bongpuffstream.com",
    siteName: "bongpuffstream",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "bongpuffstream | Watch Live TV & Sports Streaming Free",
    description:
      "Stream your favorite international and local live TV channels smoothly without lag on bongpuffstream.",
  },
  alternates: {
    canonical: "https://bongpuffstream.com",
  },
  verification: {
    google: "", // Add your Google Search Console verification code here
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
