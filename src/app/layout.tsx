import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { Calculator, Settings, BookOpen } from 'lucide-react';
import { getCurrentYear } from '@/utils/date';
import Script from 'next/script';


const currentYear = getCurrentYear();

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
    default: `Indian Calculator Hub: Free Financial, Tax & Loan Calculators ${currentYear}`,
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
        
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7LF0FFCCKK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7LF0FFCCKK');
          `}
        </Script>

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6821531199235214"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

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
        <footer className="w-full mt-auto py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* About Column */}
              <div className="space-y-4 col-span-1">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <span className="font-extrabold text-sm text-foreground">Indian Calculator Hub</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The ultimate web platform for Indian taxpayers, salary earners, homeowners, and investors. Estimate returns, calculate liabilities, and optimize your personal finances instantly.
                </p>
                <div className="text-[10px] text-muted-foreground/80 leading-relaxed">
                  Disclaimer: All calculations provided here are for educational purposes. Please consult a registered financial advisor or tax consultant before making financial decisions.
                </div>
              </div>

              {/* Category Links */}
              <div className="col-span-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Categories</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Mutual Fund Investments</Link></li>
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Home & Auto Loans</Link></li>
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Income Tax & GST</Link></li>
                  <li><Link href="/#all-calculators" className="hover:text-primary transition-colors">Retirement & EPF Planning</Link></li>
                </ul>
              </div>

              {/* Popular Tools Links */}
              <div className="col-span-1">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Popular Tools</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li><Link href="/sip-calculator" className="hover:text-primary transition-colors">SIP Calculator</Link></li>
                  <li><Link href="/emi-calculator" className="hover:text-primary transition-colors">EMI Calculator</Link></li>
                  <li><Link href="/income-tax-calculator" className="hover:text-primary transition-colors">Income Tax Calculator</Link></li>
                  <li><Link href="/salary-calculator" className="hover:text-primary transition-colors">Salary Calculator</Link></li>
                </ul>
              </div>

            </div>

            <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground border-t border-border/20">
              <span>&copy; {currentYear} Indian Calculator Hub. All rights reserved.</span>
              <span>Made for Indian Investors &amp; Taxpayers</span>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
