import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wolver - Smart Loans",
  description: "Access flexible financing options with Wolver",
  metadataBase: new URL('https://wolver.vercel.app'),
  openGraph: {
    title: 'Wolver - Smart Loans',
    description: 'Access flexible financing options with Wolver',
    url: 'https://wolver.vercel.app',
    siteName: 'Wolver',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1a1a1a]`}>{children}</body>
    </html>
  );
}
