'use client';

import { useEffect } from 'react';

interface RecentTrackerClientProps {
  slug: string;
}

export default function RecentTrackerClient({ slug }: RecentTrackerClientProps) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem('recent-calculators');
      let slugs: string[] = saved ? JSON.parse(saved) : [];
      
      // Filter out existing slug, prepend to front, and limit size to 8
      slugs = [slug, ...slugs.filter((s) => s !== slug)].slice(0, 8);
      
      localStorage.setItem('recent-calculators', JSON.stringify(slugs));
    } catch (err) {
      console.error('Failed to update recent calculators history:', err);
    }
  }, [slug]);

  return null;
}
