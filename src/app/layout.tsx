import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: "Shivang Kandoi - Portfolio",
  description: "Tech enthusiast exploring AI/ML, agents, cybersecurity, networking, and web development",
  keywords: ["Portfolio", "Developer", "AI/ML", "Cybersecurity", "Web Development"],
  authors: [{ name: "Shivang Kandoi" }],
  openGraph: {
    title: "Shivang Kandoi - Portfolio",
    description: "Tech enthusiast exploring AI/ML, agents, cybersecurity, networking, and web development",
    url: "https://shivangkandoi.com",
    siteName: "Shivang Kandoi Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} relative antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
