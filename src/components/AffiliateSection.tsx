'use client';

import { AffiliateProduct } from '@/types/calculator';
import { Star, ShieldCheck, ArrowUpRight } from 'lucide-react';

// Contextual affiliate data store for Indian users
const AFFILIATE_PRODUCTS: Record<string, AffiliateProduct[]> = {
  loans: [
    {
      id: 'sbi-home-loan',
      name: 'SBI Home Loan',
      provider: 'State Bank of India',
      description: 'Lowest interest rates starting at 8.40% p.a. with flexible repayment options and nil processing charges on select offers.',
      ctaText: 'Check Eligibility',
      ctaLink: 'https://www.sbi.co.in',
      rating: 4.7,
      features: ['Nil Prepayment Charges', 'Interest Capped Daily', 'Up to 30 Years Tenure'],
      badge: 'Best Rates',
    },
    {
      id: 'hdfc-personal-loan',
      name: 'HDFC Express Personal Loan',
      provider: 'HDFC Bank',
      description: 'Instant loan approval for salaried individuals. Rates starting at 10.5% p.a. Paperless digital application process.',
      ctaText: 'Apply in 10 Min',
      ctaLink: 'https://www.hdfcbank.com',
      rating: 4.6,
      features: ['Funds in 10 seconds', 'Minimal Documentation', 'Overdraft Facility'],
      badge: 'Fast Disbursal',
    },
  ],
  investments: [
    {
      id: 'zerodha-coin',
      name: 'Zerodha Coin',
      provider: 'Zerodha',
      description: 'India\'s largest direct mutual funds platform. Invest in direct mutual funds for ₹0 brokerage or commission charges.',
      ctaText: 'Open Free Account',
      ctaLink: 'https://zerodha.com',
      rating: 4.9,
      features: ['Direct Mutual Funds', 'Zero Commission Fees', 'Integrated Portfolio View'],
      badge: 'Top Rated',
    },
    {
      id: 'groww-investment',
      name: 'Groww Mutual Funds',
      provider: 'Groww',
      description: 'Highly intuitive SIP investing app. Setup automated monthly SIPs in under 2 minutes. Free account opening.',
      ctaText: 'Start Investing',
      ctaLink: 'https://groww.in',
      rating: 4.8,
      features: ['1-Click AutoPay Setup', 'Instant Bank Link', 'Track External Funds'],
      badge: 'Most Popular',
    },
  ],
  tax: [
    {
      id: 'cleartax-itr',
      name: 'ClearTax ITR Filer',
      provider: 'ClearTax',
      description: 'File your Indian Income Tax Return (ITR) in under 7 minutes. Automatically imports Form 16 and pre-fills tax details.',
      ctaText: 'File ITR Instantly',
      ctaLink: 'https://cleartax.in',
      rating: 4.8,
      features: ['Auto Form-16 Parsing', 'AI Deduction Optimizer', 'Expert Tax Review Available'],
      badge: 'Easy Filing',
    },
  ],
  salary: [
    {
      id: 'indusind-savings',
      name: 'IndusInd Exclusive Savings',
      provider: 'IndusInd Bank',
      description: 'Earn high interest rates up to 6.75% p.a. on your savings bank account. Get a premium lifetime free debit card.',
      ctaText: 'Open Account Online',
      ctaLink: 'https://www.indusind.com',
      rating: 4.5,
      features: ['6.75% Interest Rates', 'Zero Balance Salary Account', 'Complimentary Lounge Access'],
      badge: 'High Yield',
    },
  ],
  utilities: [
    {
      id: 'amazon-pay-icici',
      name: 'Amazon Pay ICICI Card',
      provider: 'ICICI Bank',
      description: 'Lifetime free credit card. Earn flat 5% cashback on Amazon purchases for Prime members, and 2% cashback on payments.',
      ctaText: 'Apply Card Now',
      ctaLink: 'https://www.icicibank.com',
      rating: 4.8,
      features: ['Lifetime Free Card', 'Unlimited 5% Cashback', 'No Minimum Spend Caps'],
      badge: 'Best Cashback',
    },
  ],
};

interface AffiliateSectionProps {
  category: 'loans' | 'investments' | 'tax' | 'salary' | 'utilities';
}

export default function AffiliateSection({ category }: AffiliateSectionProps) {
  const products = AFFILIATE_PRODUCTS[category] || AFFILIATE_PRODUCTS.investments;

  return (
    <div id="affiliates" className="w-full border border-border/80 rounded-2xl bg-card p-6 shadow-sm relative overflow-hidden transition-all duration-300">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-primary font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Recommended Financial Partnerships</span>
          </div>
          <h3 className="text-xl font-bold text-foreground">Top Deals & Financial Products</h3>
          <p className="text-sm text-muted-foreground">Handpicked offerings that complement your financial plans</p>
        </div>
        <div className="text-[11px] text-muted-foreground/80 bg-muted/60 px-3 py-1 rounded-full border border-border/50 self-start md:self-auto">
          Partner Disclosures Apply
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div 
            key={product.id}
            className="border border-border/80 rounded-xl bg-muted/20 p-5 flex flex-col justify-between hover:border-primary/50 hover:bg-muted/30 transition-all duration-300 relative group"
          >
            {product.badge && (
              <span className="absolute top-4 right-4 bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                {product.badge}
              </span>
            )}

            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                {product.provider}
              </span>
              <h4 className="text-lg font-bold text-foreground mt-0.5 group-hover:text-primary transition-colors flex items-center gap-1">
                {product.name}
              </h4>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-1 mt-1 mb-3">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(product.rating || 0) ? 'fill-amber-500' : 'text-muted/80'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-foreground/80 mt-0.5">
                    {product.rating} / 5
                  </span>
                </div>
              )}

              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Features checklist */}
              {product.features && (
                <ul className="space-y-1.5 mb-5">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-[11px] text-foreground/80 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/75"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <a
              href={product.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-1 bg-primary text-primary-foreground font-semibold text-xs py-2.5 px-4 rounded-lg hover:bg-primary/95 shadow-sm transition-all text-center"
            >
              <span>{product.ctaText}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
