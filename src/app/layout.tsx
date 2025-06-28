import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout";
import { AuthProvider, ThemeProvider, HydrationProvider } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { ClientOnly } from "@/components/ui/client-only";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RiseTrack OS - Personal Life Management System",
  description: "A holistic personal development system to track and stay aligned with your vision, goals, time, and progress in 2025.",
  keywords: ["productivity", "goal tracking", "time management", "personal development", "journal"],
  authors: [{ name: "Sandesh" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        <ClientOnly>
          <HydrationProvider>
            <ThemeProvider>
              <AuthProvider>
                <AppLayout>
                  {children}
                </AppLayout>
                <Toaster />
              </AuthProvider>
            </ThemeProvider>
          </HydrationProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
