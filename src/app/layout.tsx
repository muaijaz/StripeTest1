import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "CivicFund — Modern Political Fundraising",
  description:
    "Donation platform for campaigns, PACs, and grassroots donors built on Stripe Connect."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <a className="text-xl font-semibold text-slate-950" href="/">
                  CivicFund
                </a>
                <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
                  <a href="/login">Log in</a>
                  <a className="btn-primary" href="/register">
                    Become a fundraising partner
                  </a>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-slate-200 bg-white py-8 text-sm text-slate-500">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4">
                <p>© {new Date().getFullYear()} CivicFund. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <a href="#">Terms</a>
                  <a href="#">Privacy</a>
                  <a href="#">FEC compliance</a>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
