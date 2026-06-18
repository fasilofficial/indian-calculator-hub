export interface InputOption {
  label: string;
  value: string | number;
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'range' | 'select';
  min?: number;
  max?: number;
  step?: number;
  defaultValue: number | string;
  unit?: string;
  options?: InputOption[];
}

export interface CalculatorOutput {
  id: string;
  label: string;
  type: 'currency' | 'percentage' | 'number' | 'years';
}

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface CalculatorSEO {
  title: string;
  description: string;
  keywords: string[];
}

export interface CalculatorConfig {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: 'Investments' | 'Loans' | 'Taxation' | 'Salary' | 'Retirement' | 'Savings' | 'Utilities';
  tagline: string;
  seo: CalculatorSEO;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  calculate: (inputs: Record<string, any>) => Record<string, any>;
  chartType: 'donut' | 'bar' | 'none';
  faqs: CalculatorFAQ[];
  formulaDescription: string;
  relatedSlugs: string[];
  affiliateCategory: 'loans' | 'investments' | 'tax' | 'salary' | 'utilities';
}

export interface AffiliateProduct {
  id: string;
  name: string;
  provider: string;
  logoUrl?: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  rating?: number;
  features?: string[];
  badge?: string;
}
