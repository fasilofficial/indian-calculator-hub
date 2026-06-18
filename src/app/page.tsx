'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CALCULATOR_LIST, CATEGORIES } from '@/data/calculators';
import { CalculatorConfig } from '@/types/calculator';
import { Search, Flame, Clock, Grid, ShieldCheck, ChevronRight } from 'lucide-react';
import AdSenseSlot from '@/components/AdSenseSlot';

// Static lists of popular/trending calculator slugs for quick access
const TRENDING_SLUGS = [
  'sip-calculator',
  'income-tax-calculator',
  'emi-calculator',
  'salary-calculator',
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recentCalculators, setRecentCalculators] = useState<CalculatorConfig[]>([]);

  // Load recently used calculators from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recent-calculators');
      if (saved) {
        const slugs: string[] = JSON.parse(saved);
        const list = slugs
          .map((slug) => CALCULATOR_LIST.find((c) => c.slug === slug))
          .filter((c): c is CalculatorConfig => !!c);
        setRecentCalculators(list.slice(0, 4));
      }
    } catch (err) {
      console.error('Failed to load recent calculators:', err);
    }
  }, []);

  // Filtered calculators
  const filteredCalculators = CALCULATOR_LIST.filter((calc) => {
    const matchesSearch = 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.seo.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      calc.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const trendingCalculators = CALCULATOR_LIST.filter((c) => TRENDING_SLUGS.includes(c.slug));

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Accurate calculations for Financial Year 2026-27</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          India's Premier <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Financial Calculators</span> Hub
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Calculate investments, income tax slabs, loan amortization schedules, and take-home salaries instantly with zero page reloads.
        </p>
      </section>

      {/* Ad placement on homepage */}
      <AdSenseSlot id="home-top-ad" placement="header" />

      {/* Search & Shortcuts Bar */}
      <section className="max-w-2xl mx-auto space-y-4">
        <div className="relative w-full rounded-2xl border border-border bg-card p-1.5 shadow-md flex items-center gap-3">
          <div className="pl-3 text-muted-foreground">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search calculators (e.g. SIP, GST, Income Tax...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent py-2 border-0 outline-none text-sm text-foreground placeholder:text-muted-foreground font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-1 bg-muted rounded-lg"
            >
              Clear
            </button>
          )}
        </div>
      </section>

      {/* Main Layout Grid (Recent / Trending & All Calculators) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar Left: Recent & Trending */}
        <aside className="lg:col-span-1 space-y-8">
          {/* Recently Used */}
          {recentCalculators.length > 0 && (
            <div className="border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-foreground/80 font-bold text-sm border-b border-border/60 pb-2.5">
                <Clock className="h-4 w-4 text-primary" />
                <span>Recently Used</span>
              </div>
              <ul className="space-y-3">
                {recentCalculators.map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={`/${calc.slug}`}
                      className="group flex items-center justify-between text-xs font-bold text-muted-foreground hover:text-primary transition-colors py-1"
                    >
                      <span className="truncate max-w-[130px]">{calc.shortName}</span>
                      <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Trending Calculators */}
          <div className="border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-foreground/80 font-bold text-sm border-b border-border/60 pb-2.5">
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500/10" />
              <span>Trending Tools</span>
            </div>
            <ul className="space-y-3">
              {trendingCalculators.map((calc) => (
                <li key={calc.slug}>
                  <Link
                    href={`/${calc.slug}`}
                    className="group flex items-center justify-between text-xs font-bold text-muted-foreground hover:text-primary transition-colors py-1"
                  >
                    <span className="truncate max-w-[130px]">{calc.shortName}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Right Side: Calculators List */}
        <section id="all-calculators" className="lg:col-span-3 space-y-8 scroll-mt-20">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                    : 'bg-muted/60 text-muted-foreground border border-border/40 hover:text-foreground hover:bg-muted'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Calculator Grid */}
          {filteredCalculators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="group border border-border/80 rounded-2xl bg-card p-5 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 inline-block uppercase mb-3.5">
                      {calc.category}
                    </span>
                    <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                      {calc.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-primary mt-5 self-start group-hover:gap-2 transition-all">
                    <span>Calculate Now</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card">
              <Grid className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-sm font-bold text-foreground">No calculators found</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                Try searching for other keywords, or browse through the categories tab.
              </p>
            </div>
          )}
        </section>
      </div>

      {/* Structured SEO Content Section */}
      <section className="border border-border/80 rounded-2xl bg-card p-6 md:p-8 shadow-sm space-y-6 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
          Your Comprehensive Guide to Personal Finance in India
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-muted-foreground leading-relaxed">
          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-sm">Grow Wealth with SIP & Investment Planning</h3>
            <p>
              Planning your investments early is the key to achieving financial freedom in India. Using tools like our <strong>SIP Calculator</strong>, you can project the future compounding value of monthly mutual fund investments. Mutual funds are excellent tools for equity growth. By estimating returns, you can adjust your systematic plan to hit long-term retirement goals.
            </p>
            <p>
              For guaranteed returns, standard bank instruments are highly popular. Use our <strong>FD Calculator</strong> or <strong>RD Calculator</strong> to estimate quarterly compound growth. Additionally, tax-saving schemes like the <strong>PPF Calculator</strong> allow you to plan safe, long-term deposits that qualify for Section 80C exemptions, guaranteeing steady risk-free interest.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-foreground text-sm">Optimize Taxes & Manage Home/Car Loans</h3>
            <p>
              Navigating India's dual tax regimes is a core focus for all salaried employees. The <strong>Income Tax Calculator India</strong> compiles your gross annual salary to compare Old and New Tax Regime slabs under current laws. It lets you figure out if deductions like Section 80C, 80D, and HRA exemptions offer enough savings to warrant staying in the Old Regime.
            </p>
            <p>
              Borrowing is often required for large life goals. When budgeting for property, our <strong>Home Loan EMI Calculator</strong> lets you evaluate monthly payments, total interest liabilities, and detailed amortization schedules. This ensures you do not over-leverage. Combined with the <strong>Salary Calculator</strong>, you can calculate take-home wages to confirm home loans fit comfortably in your budget.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
