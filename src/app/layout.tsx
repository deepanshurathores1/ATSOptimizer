import "@/styles/globals.css"
import { cn } from "@/lib"
import { generateMetadata } from "@/utils"
import { base, heading } from "@/constants"
import { Toaster } from "@/components/ui/sonner"
import { subheading } from "@/constants/fonts"
import { ThemeProvider } from "@/components/marketing/theme-provider"
import type React from "react" // Added import for React

export const metadata = generateMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased font-heading overflow-x-hidden !scrollbar-hide",
          base.variable,
          heading.variable,
          subheading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Toaster richColors theme="dark" position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}