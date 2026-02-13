import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "./providers";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UP Machines",
  description: "UP Machines - Aluguel de máquinas para eventos",
  authors: [{ name: "UP Machines" }],
  openGraph: {
    title: "UP Machines",
    description: "UP Machines - Aluguel de máquinas para eventos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="shortcut icon" href="/logo-favicon.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
