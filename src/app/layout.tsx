import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import FloatingChatbot from "@/components/FloatingChatbot";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AegisFlow | Analytical Dashboard",
  description: "Highly analytical dashboard interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Sidebar />
          <main className="pl-64 min-h-screen opacity-100 z-10 relative">
            <div className="p-8 h-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <FloatingChatbot />
        </ThemeProvider>
      </body>
    </html>
  );
}
