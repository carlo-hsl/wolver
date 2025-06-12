import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wolver - Smart Loans",
  description: "Access flexible financing options with Wolver",
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
