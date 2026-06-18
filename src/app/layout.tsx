import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { Calculator, Settings, BookOpen } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Indian Calculator Hub: Free Financial, Tax & Loan Calculators 2026',
    template: '%s | Indian Calculator Hub',
  },
  description: 'Access India\'s most comprehensive collection of financial, tax, salary, investment, loan, and utility calculators. Designed for Indian taxpayers, investors, and homeowners.',
  keywords: ['Financial Calculator', 'SIP Calculator', 'EMI Calculator', 'Income Tax Calculator India', 'PF Calculator', 'Gratuity Calculator', 'FD RD PPF NPS'],
  authors: [{ name: 'Indian Calculator Hub' }],
  metadataBase: new URL('https://indiancalculatorhub.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Indian Calculator Hub: Free Financial, Tax & Loan Calculators',
    description: 'Get instant calculations for SIP, Home Loan EMI, Income Tax, PF, HRA, and more. Optimized for Indian financial rules.',
    url: 'https://indiancalculatorhub.in',
    siteName: 'Indian Calculator Hub',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indian Calculator Hub',
    description: 'Free, instant, and mobile-responsive financial calculators for Indian users.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-all duration-300">
        
        {/* Simple inline script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('theme');
                  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (_) {}
              })();
            `,
          }}
        />

        {/* Global Navigation Bar */}
        <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-md shadow-primary/20">
                <Calculator className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight leading-none text-foreground">
                  Indian Calculator
                </span>
                <span className="font-semibold text-[10px] text-primary tracking-widest uppercase mt-0.5 leading-none">
                  Hub
                </span>
              </div>
            </Link>

            {/* Navigation links & Actions */}
            <nav className="flex items-center gap-4">
              <Link 
                href="/#all-calculators" 
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                <span>Calculators</span>
              </Link>
              
              <Link 
                href="/admin" 
                className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
                title="Management Dashboard"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Link>

              <div className="h-4 w-[1px] bg-border/80 hidden sm:block"></div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </nav>
          </div>
        </header>

        {/* Main Workspace content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="w-full border-t border-border bg-muted/30 mt-auto py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              {/* About Column */}
              <div className="space-y-4 md:col-span-2">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-sm text-foreground">Indian Calculator Hub</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                  The ultimate web platform for Indian taxpayers, salary earners, homeowners, and investors. Estimate returns, calculate liabilities, and optimize your personal finances instantly.
                </p>
                <div className="text-[10px] text-muted-foreground/80 leading-relaxed max-w-sm">
                  Disclaimer: All calculations provided here are for educational purposes. Please consult a registered financial advisor or tax consultant before making financial decisions.
                </div>
              </div>

              {/* Category Links */}
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Categories</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Mutual Fund Investments</Link></li>
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Home & Auto Loans</Link></li>
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Income Tax & GST</Link></li>
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Retirement & EPF Planning</Link></li>
                </ul>
              </div>

              {/* Legal & Tech links */}
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Sitemap & Meta</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li><Link href="/sitemap.xml" className="hover:text-primary transition-colors">XML Sitemap</Link></li>
                  <li><span className="font-semibold">Current Year: 2026</span></li>
                  <li><span className="font-semibold">Engine: Next.js 15 SSR</span></li>
                  <li><span className="font-semibold">Tailwind CSS v4</span></li>
                </ul>
              </div>

            </div>

            <div className="border-t border-border/60 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <span>&copy; 2026 Indian Calculator Hub. All rights reserved.</span>
              <span>Made for Indian Investors &amp; Taxpayers</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
