import {
  CheckCircle2Icon,
  CircleAlertIcon,
  LoaderIcon,
  TriangleAlertIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";

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
  title: "Shop",
  description: "Admin for native shop react native app",
  applicationName: "admin native-shop app",
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
        <Toaster
          duration={3000}
          gap={5}
          position="top-center"
          theme="dark"
          visibleToasts={3}
          hotkey={["esc", "escape"]}
          icons={{
            loading: <LoaderIcon className="animate-spin" />,
            success: <CheckCircle2Icon className="text-green-500" />,
            warning: <CircleAlertIcon className="text-yellow-500" />,
            error: <TriangleAlertIcon className="text-red-500" />,
          }}
          toastOptions={{
            closeButton: false,
            duration: 3000,
          }}
        />
        {children}
      </body>
    </html>
  );
}
