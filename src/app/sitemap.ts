import { MetadataRoute } from 'next';
import { CALCULATOR_LIST } from '@/data/calculators';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const calculators = CALCULATOR_LIST.map((calc) => ({
    url: `https://indiancalculatorhub.in/${calc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://indiancalculatorhub.in',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    ...calculators,
  ];
}
