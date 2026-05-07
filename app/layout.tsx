import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayoutContent } from "./layout-content";
import "./globals.css";

export const metadata: Metadata = {
  title: "노션 CMS 견적서 시스템 | 견적서쓰",
  description:
    "노션을 CMS로 활용하여 견적서를 작성하고, 클라이언트가 고유 링크로 웹에서 확인 및 PDF 다운로드할 수 있는 시스템",
  keywords: ["견적서", "노션", "CMS", "PDF", "클라이언트", "공유"],
  metadataBase: new URL("https://notion-cms.example.com"),
  openGraph: {
    title: "노션 CMS 견적서 시스템",
    description: "노션 기반 견적서 발행 및 공유 플랫폼",
    type: "website",
    url: "https://notion-cms.example.com",
    images: [
      {
        url: "https://notion-cms.example.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "노션 CMS 견적서 시스템",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "노션 CMS 견적서 시스템",
    description: "노션 기반 견적서 발행 및 공유 플랫폼",
  },
  alternates: {
    canonical: "https://notion-cms.example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className="h-full antialiased font-sans"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <TooltipProvider>
              <RootLayoutContent>{children}</RootLayoutContent>
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
