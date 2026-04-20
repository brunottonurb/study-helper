import type { Metadata } from "next";
import "./globals.css";
import { Header, ThemeProvider, UserDataProvider } from "@/components";
import { AuthProvider } from "@/components/AuthProvider";

export const metadata: Metadata = {
  title: "Study Helper",
  description: "A personal study helper web application to document and review what I've learned throughout my software development career",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased bg-[var(--background)] text-[var(--ink)] min-h-screen flex flex-col transition-colors duration-300"
      >
        <AuthProvider>
          <ThemeProvider>
            <UserDataProvider>
              <Header />
              <main className="flex-1 min-h-0">{children}</main>
            </UserDataProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
