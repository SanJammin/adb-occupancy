import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADB Occupancy Calculator",
  description: "Preliminary occupancy calculator (ADB Vol.2, Table D1).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-background text-foreground">
        <header className="border-b sticky top-0 bg-background/80 backdrop-blur z-50">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="font-semibold">Occupancy Calculator</div>
            <nav className="text-sm space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/calc" className="hover:underline">Calculation</a>
              <a href="/help" className="hover:underline">Help</a>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-12 border-t">
          <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted-foreground">
            Based on ADB Vol.2 (2019 ed. with 2020/2022 amendments). Preliminary tool only.
          </div>
        </footer>
      </body>
    </html>
  );
}