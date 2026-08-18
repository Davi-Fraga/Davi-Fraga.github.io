import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { SmoothScrollRoot } from "@/components/providers/smooth-scroll-root";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Davi Fraga | Desenvolvedor Full Stack & Engenharia de Software",
  description:
    "Desenvolvedor Full Stack e estudante de Engenharia de Software com experiência em Java, Spring Boot, TypeScript, Node.js, NestJS, React, Next.js, Angular, PostgreSQL, Docker e testes automatizados.",
  keywords: [
    "Davi Fraga",
    "Desenvolvedor Full Stack",
    "Engenharia de Software",
    "Java",
    "Spring Boot",
    "TypeScript",
    "NestJS",
    "Node.js",
    "React",
    "Next.js",
    "Angular",
    "PostgreSQL",
    "Docker",
    "Testes Automatizados",
    "Backend Developer",
  ],
  authors: [{ name: "Davi Fraga" }],
  creator: "Davi Fraga",
  openGraph: {
    title: "Davi Fraga | Desenvolvedor Full Stack & Engenharia de Software",
    description:
      "Portfólio de engenharia de software: sistemas corporativos, APIs resilientes, arquitetura full stack e produtos em produção com Java, TypeScript, React, Angular, Node.js e Docker.",
    type: "website",
    locale: "pt_BR",
    siteName: "Davi Fraga Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Davi Fraga | Desenvolvedor Full Stack & Engenharia de Software",
    description:
      "Sistemas corporativos, APIs resilientes e arquitetura full stack com Java, TypeScript, React, Angular, Node.js, PostgreSQL e Docker.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#090d16" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollRoot>
            {children}
            <Toaster position="bottom-right" />
          </SmoothScrollRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
