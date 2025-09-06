import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.about,
  metadataBase: new URL("https://your-domain.com"), // update after deploy
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
              <div className="font-semibold">{site.name}</div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-5xl p-4 md:p-6">{children}</main>
          <footer className="mx-auto max-w-5xl p-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {site.name}
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
