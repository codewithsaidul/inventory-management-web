import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

const ralewayHeading = Raleway({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


export const metadata: Metadata = {
  title: "Inventory Management System - CodeWithSaidul",
  description: "A comprehensive inventory management system built with Next.js, TypeScript, and Prisma. This application allows users to efficiently manage their inventory, track stock levels, and generate reports. It features a user-friendly interface and robust backend to ensure seamless inventory control.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", "dark", inter.variable, ralewayHeading.variable)}
    >
      <body className="min-h-full flex flex-col">{children} <Toaster /> </body>
    </html>
  );
}
