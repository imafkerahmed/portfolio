import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";
import { site } from "@/lib/config";
import RootLoaderShell from "@/components/RootLoaderShell";
import { BackgroundParticles } from "@/components/ui/background/BackgroundParticles";

export const metadata: Metadata = {
  title: `${site.name} — Portfolio`,
  description: site.about,
  metadataBase: new URL("https://your-domain.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <BackgroundParticles
          density={1}
          disabledOnMobile={true}
          colors={["#ffffff", "#b0b0ff"]}
        />

        <RootLoaderShell minimumVisibleMs={2500}>
          <ThemeProvider>
            {/* Floating Theme Toggle
                Mobile: square box (not circle) with subtle blur & border
                Desktop (md+): background chrome removed, revert to plain toggle */}
            <div className="fixed right-3 bottom-3 md:top-3 md:bottom-auto z-50">
              <div
                className="
                  flex items-center justify-center
                  h-12 w-12 rounded-lg
                  border border-border/40 bg-background/70 backdrop-blur-sm shadow-sm
                  ring-1 ring-border/30
                  md:h-auto md:w-auto
                  md:bg-transparent md:border-0 md:shadow-none md:ring-0 md:backdrop-blur-0
                "
              >
                <ThemeToggle aria-label="Toggle theme" />
              </div>
            </div>

            <main className="relative z-10 mx-auto max-w-5xl p-4 md:p-6">
              {children}
            </main>

            <footer className="relative z-10 mx-auto max-w-5xl p-4 text-xs text-muted-foreground">
              © {new Date().getFullYear()} {site.name}
            </footer>
          </ThemeProvider>
        </RootLoaderShell>
      </body>
    </html>
  );
}