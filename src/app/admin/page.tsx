'use client';

import { useState, useEffect } from 'react';
import { CALCULATOR_LIST } from '@/data/calculators';
import { 
  TrendingUp, 
  Settings2, 
  Coins, 
  Eye, 
  Save, 
  FileText, 
  Check, 
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  DollarSign
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'manager' | 'monetization'>('analytics');
  
  // Local states for Calculator management
  const [selectedCalcSlug, setSelectedCalcSlug] = useState(CALCULATOR_LIST[0].slug);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local states for Monetization settings
  const [hideAds, setHideAds] = useState(false);
  const [commissionRate, setCommissionRate] = useState(5);
  const [partnerLink, setPartnerLink] = useState('https://groww.in/mutual-funds');
  const [monetizationSaveSuccess, setMonetizationSaveSuccess] = useState(false);

  // Initialize configurations from localStorage on mount
  useEffect(() => {
    const adsPref = localStorage.getItem('hide-mock-ads') === 'true';
    setHideAds(adsPref);

    const savedCommission = localStorage.getItem('affiliate-commission-rate');
    if (savedCommission) setCommissionRate(Number(savedCommission));

    const savedLink = localStorage.getItem('affiliate-partner-link');
    if (savedLink) setPartnerLink(savedLink);
  }, []);

  // Sync edits when selected calculator changes
  useEffect(() => {
    const calc = CALCULATOR_LIST.find((c) => c.slug === selectedCalcSlug);
    if (calc) {
      setEditedTitle(calc.seo.title);
      setEditedDesc(calc.seo.description);
    }
  }, [selectedCalcSlug]);

  const handleSaveCalculator = (e: React.FormEvent) => {
    e.preventDefault();
    // In a full production app, this would write to a database/API.
    // For our serverless, static-rendering framework, we mock the action and save to state.
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveMonetization = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hide-mock-ads', hideAds ? 'true' : 'false');
    localStorage.setItem('affiliate-commission-rate', commissionRate.toString());
    localStorage.setItem('affiliate-partner-link', partnerLink);
    
    // Dispatch custom event to notify other open tabs (if any)
    window.dispatchEvent(new Event('storage'));

    setMonetizationSaveSuccess(true);
    setTimeout(() => setMonetizationSaveSuccess(false), 3000);
  };

  const activeCalc = CALCULATOR_LIST.find((c) => c.slug === selectedCalcSlug) || CALCULATOR_LIST[0];

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
            Admin Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure SEO landing pages, view analytics, and control AdSense/Affiliate configurations.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 rounded-xl border border-border/80 bg-muted/30 p-1 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'analytics'
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('manager')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'manager'
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Calculators</span>
          </button>
          <button
            onClick={() => setActiveTab('monetization')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'monetization'
                ? 'bg-card text-primary shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Coins className="h-4 w-4" />
            <span>Monetization</span>
          </button>
        </div>
      </div>

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-scale-in">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Pageviews */}
            <div className="border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase">
                <span>Total Pageviews</span>
                <Eye className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">1,248,390</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                <TrendingUp className="h-3 w-3" />
                <span>+12.4% vs last month</span>
              </div>
            </div>

            {/* Simulated Earnings */}
            <div className="border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase">
                <span>AdSense Earnings</span>
                <DollarSign className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">₹3,42,850</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                <TrendingUp className="h-3 w-3" />
                <span>+8.2% vs last month</span>
              </div>
            </div>

            {/* Average RPM */}
            <div className="border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase">
                <span>Average Page RPM</span>
                <Coins className="h-4 w-4 text-amber-500" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">₹274.60</div>
              <div className="flex items-center gap-1 text-[10px] text-rose-500 font-bold">
                <TrendingDown className="h-3 w-3" />
                <span>-2.1% vs last week</span>
              </div>
            </div>

            {/* Conversions */}
            <div className="border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-muted-foreground uppercase">
                <span>Affiliate Leads</span>
                <ArrowRight className="h-4 w-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-extrabold text-foreground">12,842</div>
              <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                <TrendingUp className="h-3 w-3" />
                <span>+24.8% vs last month</span>
              </div>
            </div>

          </div>

          {/* Traffic Trend Chart (Custom SVG) */}
          <div className="border border-border/80 rounded-2xl bg-card p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-foreground text-sm">Traffic Acquisition Trends</h3>
              <p className="text-xs text-muted-foreground">Monthly organic search pageviews simulation</p>
            </div>
            
            <div className="h-[200px] w-full relative pt-6">
              {/* SVG Line Graph */}
              <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(99, 102, 241, 0.2)" />
                    <stop offset="100%" stopColor="rgba(99, 102, 241, 0.0)" />
                  </linearGradient>
                </defs>

                {/* Gridlines */}
                <line x1="0" y1="50" x2="1000" y2="50" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="5,5" />
                <line x1="0" y1="100" x2="1000" y2="100" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="5,5" />
                <line x1="0" y1="150" x2="1000" y2="150" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="5,5" />

                {/* Gradient area */}
                <path 
                  d="M 0 180 L 100 150 L 200 160 L 300 120 L 400 90 L 500 110 L 600 70 L 700 80 L 800 50 L 900 65 L 1000 30 L 1000 200 L 0 200 Z" 
                  fill="url(#chartGradient)"
                />

                {/* Trend line */}
                <path 
                  d="M 0 180 L 100 150 L 200 160 L 300 120 L 400 90 L 500 110 L 600 70 L 700 80 L 800 50 L 900 65 L 1000 30" 
                  fill="none" 
                  stroke="var(--primary)" 
                  strokeWidth="3"
                  className="stroke-primary"
                />

                {/* Nodes */}
                <circle cx="0" cy="180" r="4" fill="var(--primary)" />
                <circle cx="100" cy="150" r="4" fill="var(--primary)" />
                <circle cx="200" cy="160" r="4" fill="var(--primary)" />
                <circle cx="300" cy="120" r="4" fill="var(--primary)" />
                <circle cx="400" cy="90" r="4" fill="var(--primary)" />
                <circle cx="500" cy="110" r="4" fill="var(--primary)" />
                <circle cx="600" cy="70" r="4" fill="var(--primary)" />
                <circle cx="700" cy="80" r="4" fill="var(--primary)" />
                <circle cx="800" cy="50" r="4" fill="var(--primary)" />
                <circle cx="900" cy="65" r="4" fill="var(--primary)" />
                <circle cx="1000" cy="30" r="4" fill="var(--primary)" />
              </svg>
            </div>
            {/* Axis labels */}
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono font-medium border-t border-border pt-2">
              <span>Jul 2025</span>
              <span>Sep 2025</span>
              <span>Nov 2025</span>
              <span>Jan 2026</span>
              <span>Mar 2026</span>
              <span>May 2026</span>
            </div>
          </div>
        </div>
      )}

      {/* Calculators manager tab */}
      {activeTab === 'manager' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-scale-in">
          {/* List of calculators */}
          <div className="lg:col-span-1 border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-foreground text-sm border-b border-border/60 pb-2.5">
              Active Calculators ({CALCULATOR_LIST.length})
            </h3>
            
            <div className="flex flex-col gap-2 max-h-[480px] overflow-y-auto pr-1">
              {CALCULATOR_LIST.map((calc) => (
                <button
                  key={calc.slug}
                  onClick={() => setSelectedCalcSlug(calc.slug)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-bold flex flex-col gap-1 ${
                    selectedCalcSlug === calc.slug
                      ? 'border-primary bg-primary/5 text-primary shadow-sm'
                      : 'border-border/50 hover:bg-muted/40 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="truncate">{calc.shortName}</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold opacity-85">
                    {calc.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form details to edit metadata/FAQs */}
          <div className="lg:col-span-2 border border-border/80 rounded-2xl bg-card p-6 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-foreground text-sm border-b border-border/60 pb-2.5">
                SEO Metadata &amp; Content Editor: <span className="text-primary">{activeCalc.shortName}</span>
              </h3>
            </div>

            <form onSubmit={handleSaveCalculator} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-muted-foreground uppercase">Target slug</label>
                <input
                  type="text"
                  disabled
                  value={`/${activeCalc.slug}`}
                  className="w-full border border-border bg-muted/40 text-muted-foreground/85 px-3.5 py-2 rounded-lg text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground/80 uppercase">SEO Title Tag</label>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="w-full border border-border bg-card hover:bg-muted/10 text-foreground px-3.5 py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground/80 uppercase">Meta Description</label>
                <textarea
                  rows={3}
                  value={editedDesc}
                  onChange={(e) => setEditedDesc(e.target.value)}
                  className="w-full border border-border bg-card hover:bg-muted/10 text-foreground px-3.5 py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all leading-relaxed"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-foreground/80 uppercase">Keywords (Comma Separated)</label>
                <input
                  type="text"
                  defaultValue={activeCalc.seo.keywords.join(', ')}
                  className="w-full border border-border bg-card hover:bg-muted/10 text-foreground px-3.5 py-2 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>

              {/* Status messages */}
              {saveSuccess && (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg animate-fade-in">
                  <Check className="h-4 w-4" />
                  <span>SEO Changes Saved Mock-Successfully! Changes pre-rendered dynamically in page headers.</span>
                </div>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-primary/95 transition-all shadow-sm cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Calculator Meta</span>
              </button>

            </form>
          </div>
        </div>
      )}

      {/* Monetization settings tab */}
      {activeTab === 'monetization' && (
        <div className="max-w-xl mx-auto border border-border/80 rounded-2xl bg-card p-6 shadow-sm space-y-6 animate-scale-in">
          <div>
            <h3 className="font-bold text-foreground text-sm border-b border-border/60 pb-2.5">
              Monetization &amp; Integration Settings
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Toggle live Google AdSense codes and set target commission links for financial affiliate partnerships.
            </p>
          </div>

          <form onSubmit={handleSaveMonetization} className="space-y-6">
            
            {/* Ad Toggle */}
            <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground block">
                  Disable Mock Ads site-wide
                </label>
                <span className="text-[11px] text-muted-foreground leading-relaxed block">
                  Useful for taking clean screenshots or testing user interfaces without promotional blocks.
                </span>
              </div>
              <input
                type="checkbox"
                checked={hideAds}
                onChange={(e) => setHideAds(e.target.checked)}
                className="h-4.5 w-4.5 accent-primary cursor-pointer"
              />
            </div>

            {/* Target Affiliate Commission */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-foreground/80">
                <label>Default Affiliate Referral Commission (%)</label>
                <span className="font-mono text-primary">{commissionRate}%</span>
              </div>
              <input
                type="range"
                min={1}
                max={15}
                step={0.5}
                value={commissionRate}
                onChange={(e) => setCommissionRate(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Base Affiliate URL */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-foreground/80 uppercase">
                Default Demat / Mutual Fund Partner Link
              </label>
              <input
                type="url"
                value={partnerLink}
                onChange={(e) => setPartnerLink(e.target.value)}
                className="w-full border border-border bg-card hover:bg-muted/10 text-foreground px-3.5 py-2.5 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all font-mono"
                required
              />
            </div>

            {/* Status alerts */}
            {monetizationSaveSuccess && (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg animate-fade-in">
                <Check className="h-4 w-4" />
                <span>Monetization configurations updated and stored in localStorage. Mock Ads will reflect settings on reload.</span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-primary/95 transition-all shadow-sm cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </button>
              
              <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold bg-amber-500/5 px-2.5 py-1.5 rounded-lg border border-amber-500/15">
                <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                <span>Saves locally to browser cache</span>
              </div>
            </div>

          </form>
        </div>
      )}
    </div>
  );
}
