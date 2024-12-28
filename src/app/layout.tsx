import {
  BadgeCheckIcon,
  BadgeInfoIcon,
  CircleXIcon,
  LoaderIcon,
  OctagonAlertIcon,
  ShieldAlertIcon,
} from "lucide-react";
import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Native Shop Admin",
  description: "Next.js admin for native shop app",
  keywords: ["Next.js", "Admin", "Native Shop"],
  authors: [{ name: "Sourav Kumar" }, { name: "Codey" }],
  creator: "Sourav Kumar",
  publisher: "Your Company",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "Native Shop Admin",
    description: "Next.js admin for native shop app",
    images: [
      {
        url: "https://example.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Native Shop Admin",
      },
    ],
    siteName: "Native Shop Admin",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourhandle",
    creator: "@yourhandle",
  },
  applicationName: "Native Shop Admin",
  manifest: "/manifest.json",
  icons: [
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#000000",
  initialScale: 1,
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <ThemeProvider attribute={"class"}>
          <main>{children}</main>
          <Toaster
            position="top-center"
            richColors
            duration={3000}
            visibleToasts={3}
            icons={{
              success: <BadgeCheckIcon className="w-4 h-4" />,
              error: <ShieldAlertIcon className="w-4 h-4" />,
              warning: <OctagonAlertIcon className="w-4 h-4" />,
              info: <BadgeInfoIcon className="w-4 h-4" />,
              loading: <LoaderIcon className="w-4 h-4" />,
              close: <CircleXIcon className="w-4 h-4" />,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
