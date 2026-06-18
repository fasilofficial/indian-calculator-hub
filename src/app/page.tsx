'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CALCULATOR_LIST, CATEGORIES } from '@/data/calculators';
import { CalculatorConfig } from '@/types/calculator';
import { Search, Flame, Clock, Grid, ShieldCheck, ChevronRight } from 'lucide-react';
import AdSenseSlot from '@/components/AdSenseSlot';
import { getCurrentFinancialYear } from '@/utils/date';

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
  const fyString = getCurrentFinancialYear();

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
    <div className="space-y-16 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-5 pt-8 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[11px] font-bold text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Accurate calculations for Financial Year {fyString}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
          Calculators <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Hub</span>
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Calculate investments, income tax slabs, loan amortization schedules, and take-home salaries instantly with zero page reloads.
        </p>
      </section>

      {/* Centered Search & Quick Access Section */}
      <section className="max-w-2xl mx-auto space-y-6">
        <div className="relative w-full rounded-2xl border border-border bg-card p-1.5 shadow-sm flex items-center gap-3">
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

        {/* Recently Used & Trending row of pills */}
        <div className="space-y-3 pt-2">
          {recentCalculators.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
              <span className="font-bold flex items-center gap-1 flex-shrink-0">
                <Clock className="h-3.5 w-3.5 text-primary" />
                <span>Recently Used:</span>
              </span>
              {recentCalculators.map((calc) => (
                <Link
                  key={calc.slug}
                  href={`/${calc.slug}`}
                  className="px-3 py-1 rounded-full border border-border/80 bg-card/50 text-foreground/80 hover:text-primary hover:border-primary/40 text-[11px] font-semibold transition-all"
                >
                  {calc.shortName}
                </Link>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
            <span className="font-bold flex items-center gap-1 flex-shrink-0">
              <Flame className="h-3.5 w-3.5 text-amber-500 fill-amber-500/10" />
              <span>Popular:</span>
            </span>
            {trendingCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="px-3 py-1 rounded-full border border-border/80 bg-card/50 text-foreground/80 hover:text-primary hover:border-primary/40 text-[11px] font-semibold transition-all"
              >
                {calc.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Calculators Section (Full-Width layout) */}
      <section id="all-calculators" className="space-y-8 scroll-mt-20">
        
        {/* Category Tabs Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-4">
          <h2 className="text-base font-bold text-foreground uppercase tracking-wider">
            All Calculators
          </h2>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-thin">
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
        </div>

        {/* Dynamic uniform grid */}
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCalculators.map((calc) => (
              <Link
                key={calc.slug}
                href={`/${calc.slug}`}
                className="group border border-border/80 rounded-2xl bg-card p-6 shadow-sm hover:border-primary/50 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 inline-block uppercase mb-4">
                    {calc.category}
                  </span>
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {calc.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-primary mt-6 self-start group-hover:gap-2 transition-all">
                  <span>Calculate Now</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-card">
            <Grid className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <h4 className="text-sm font-bold text-foreground">No calculators found</h4>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto leading-relaxed">
              Try searching for other keywords, or browse through the categories tab.
            </p>
          </div>
        )}
      </section>

      {/* Ad placement on homepage (non-intrusive) */}
      <div className="my-8">
        <AdSenseSlot id="home-bottom-ad" placement="in-content" />
      </div>

      {/* Structured SEO Content Section */}
      <section className="border border-border/80 rounded-2xl bg-card p-8 md:p-10 shadow-sm space-y-6 max-w-4xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground border-b border-border/60 pb-3">
          Your Comprehensive Guide to Personal Finance in India
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-muted-foreground leading-relaxed">
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
