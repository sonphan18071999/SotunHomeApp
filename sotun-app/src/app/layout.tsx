import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AntdRegistry from "./AntdRegistry";
import { HomestayProvider } from "@/contexts/HomestayContext";
import { BookingProvider } from "@/contexts/BookingContext";
import AppLayout from "@/components/layout/AppLayout";
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
  title: "SotunApp – Homestay Management",
  description: "Manage homestays, rooms, bookings, and expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AntdRegistry>
          <HomestayProvider>
            <BookingProvider>
              <AppLayout>{children}</AppLayout>
            </BookingProvider>
          </HomestayProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
