import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CALCULATOR_LIST, getCalculatorBySlug, getRelatedCalculators } from '@/data/calculators';
import CalculatorRenderer from '@/components/CalculatorRenderer';
import AffiliateSection from '@/components/AffiliateSection';
import AdSenseSlot from '@/components/AdSenseSlot';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import RecentTrackerClient from './RecentTrackerClient';
import FAQAccordion from './FAQAccordion';

// Page component props matching Next.js 15 async params type
interface Props {
  params: Promise<{ slug: string }>;
}

// Statically pre-compile all calculator pages at build time
export async function generateStaticParams() {
  return CALCULATOR_LIST.map((calc) => ({
    slug: calc.slug,
  }));
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: 'Not Found',
      description: 'Calculator not found',
    };
  }

  return {
    title: calc.seo.title,
    description: calc.seo.description,
    keywords: calc.seo.keywords,
    alternates: {
      canonical: `/${calc.slug}`,
    },
    openGraph: {
      title: calc.seo.title,
      description: calc.seo.description,
      url: `https://indiancalculatorhub.in/${calc.slug}`,
      siteName: 'Indian Calculator Hub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: calc.seo.title,
      description: calc.seo.description,
    },
  };
}

function parseMarkdownToHtml(markdown: string): string {
  // Convert bold: **text** -> <strong>text</strong>
  let html = markdown.replace(/\*\/(.*?)\*\//g, '<strong>$1</strong>'); // Wait, let's make sure it's the correct regex: /\*\*(.*?)\*\*/g
  html = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Parse lines
  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('- ')) {
      const content = line.substring(2);
      if (!inList) {
        inList = true;
        result.push('<ul class="list-disc pl-5 space-y-1.5 my-3">');
      }
      result.push(`<li class="ml-1">${content}</li>`);
    } else {
      if (inList) {
        inList = false;
        result.push('</ul>');
      }
      if (line === '') {
        result.push('<div class="h-2"></div>');
      } else {
        result.push(`<p class="mb-2 leading-relaxed">${line}</p>`);
      }
    }
  }

  if (inList) {
    result.push('</ul>');
  }

  return result.join('');
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    notFound();
  }

  const relatedCalculators = getRelatedCalculators(calc);

  // Structured Data (JSON-LD Schema Markup)
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://indiancalculatorhub.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: calc.category,
        item: `https://indiancalculatorhub.in/#all-calculators`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calc.name,
        item: `https://indiancalculatorhub.in/${calc.slug}`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: calc.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const calculatorSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialCalculator',
    '@id': `https://indiancalculatorhub.in/${calc.slug}#calculator`,
    name: calc.name,
    description: calc.tagline,
    category: calc.category,
    url: `https://indiancalculatorhub.in/${calc.slug}`,
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Client-side utility to save this calculator slug into Recently Used list */}
      <RecentTrackerClient slug={calc.slug} />

      {/* Structured Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      {/* Breadcrumbs & Navigation */}
      <nav className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/#all-calculators" className="hover:text-primary transition-colors">{calc.category}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-bold truncate max-w-[180px] md:max-w-xs">{calc.shortName}</span>
        </div>
        
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Calculators</span>
        </Link>
      </nav>

      {/* Main Title Banner */}
      <div className="space-y-2 max-w-4xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight">
          {calc.name}
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {calc.tagline}
        </p>
      </div>

      {/* Ad placement above calculation block */}
      <AdSenseSlot id="calc-top-header" placement="header" />

      {/* React calculation component */}
      <div className="w-full">
        <CalculatorRenderer slug={calc.slug} />
      </div>

      {/* Side-by-side Layout for Explanations and Contextual Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Formula, Explanations, FAQs */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Formula section */}
          <section className="border border-border/80 rounded-2xl bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border/60 pb-2.5">
              How the Calculation Works
            </h2>
            <div 
              className="text-xs sm:text-sm text-muted-foreground leading-relaxed prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: parseMarkdownToHtml(calc.formulaDescription)
              }}
            />
          </section>

          {/* Ad inside content */}
          <AdSenseSlot id="calc-in-content" placement="in-content" />

          {/* FAQs section */}
          <section className="border border-border/80 rounded-2xl bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border/60 pb-2.5">
              Frequently Asked Questions (FAQs)
            </h2>
            <FAQAccordion faqs={calc.faqs} />
          </section>

        </div>

        {/* Right Side: Affiliate block and Related calculators */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Contextual Affiliate Cards */}
          <AffiliateSection category={calc.affiliateCategory} />

          {/* Ad Slot for sidebar */}
          <AdSenseSlot id="calc-sidebar-skysc" placement="sidebar" />

          {/* Related Tools */}
          {relatedCalculators.length > 0 && (
            <div className="border border-border/80 rounded-2xl bg-card p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-foreground text-sm border-b border-border/60 pb-2.5">
                Related Financial Tools
              </h3>
              <div className="flex flex-col gap-3">
                {relatedCalculators.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/${related.slug}`}
                    className="group border border-border/50 hover:border-primary/50 hover:bg-muted/10 p-3.5 rounded-xl transition-all flex justify-between items-center"
                  >
                    <div className="flex-1 min-w-0 pr-2">
                      <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">
                        {related.category}
                      </span>
                      <h4 className="text-xs font-bold text-foreground mt-0.5 group-hover:text-primary transition-colors truncate">
                        {related.shortName}
                      </h4>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
