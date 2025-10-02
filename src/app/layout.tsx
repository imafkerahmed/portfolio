import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";
import { site } from "@/lib/config";
import RootLoaderShell from "@/components/RootLoaderShell";

// (Added) Background particles (non-blocking, behind all content).
// If you implemented the dynamic version I provided earlier, adjust the import path accordingly.
// Remove or comment this line if you have not added the component yet.
import { BackgroundParticles } from "@/components/ui/background/BackgroundParticles";

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
        {/* Background (purely visual; no functional change to existing layout) */}
        <BackgroundParticles
          density={1}
          disabledOnMobile={true}
          colors={["#ffffff", "#b0b0ff"]}
        />

        <RootLoaderShell minimumVisibleMs={2500}>
          <ThemeProvider>
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
              <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
                <div className="font-semibold">{site.name}</div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                </div>
              </div>
            </header>

            {/* Elevate main & footer above background via stacking context */}
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