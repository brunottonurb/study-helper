import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header, ThemeProvider, UserDataProvider } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevShowcase - My Developer Knowledge Base",
  description: "A personal showcase of programming knowledge, frameworks, and concepts learned throughout my software development career",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--background)] text-[var(--ink)] min-h-screen transition-colors duration-300`}
      >
        <ThemeProvider>
          <UserDataProvider>
            <Header />
            <main>{children}</main>
          </UserDataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
