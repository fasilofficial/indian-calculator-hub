'use client';

import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface AdSenseSlotProps {
  id: string;
  placement: 'header' | 'above-results' | 'in-content' | 'sidebar';
}

export default function AdSenseSlot({ id, placement }: AdSenseSlotProps) {
  const [showAds, setShowAds] = useState(true);

  // Read developer/user preference for viewing ads from localStorage or state
  useEffect(() => {
    const pref = localStorage.getItem('hide-mock-ads');
    if (pref === 'true') {
      setShowAds(false);
    }
  }, []);

  // Determine size classes based on standard Google AdSense ad units
  let sizeClasses = '';
  let adLabel = '';
  let dimensions = '';

  switch (placement) {
    case 'header':
      // Leaderboard (728x90 or 320x50 responsive)
      sizeClasses = 'w-full min-h-[90px] max-w-[728px]';
      adLabel = 'Horizontal Leaderboard Ad';
      dimensions = '728 x 90 (Responsive)';
      break;
    case 'above-results':
      // Responsive Banner above calculations (horizontal or square)
      sizeClasses = 'w-full min-h-[100px] max-w-[640px]';
      adLabel = 'In-Feed Calculator Ad';
      dimensions = '640 x 100';
      break;
    case 'in-content':
      // Mid-article rectangle (300x250 or responsive)
      sizeClasses = 'w-full min-h-[250px] max-w-[336px] md:max-w-[728px] md:min-h-[120px]';
      adLabel = 'In-Content Banner Ad';
      dimensions = '336 x 250 / 728 x 90';
      break;
    case 'sidebar':
      // Large skyscraper (300x600 or 160x600)
      sizeClasses = 'w-[300px] min-h-[600px]';
      adLabel = 'Sidebar Skyscraper Ad';
      dimensions = '300 x 600';
      break;
  }

  if (!showAds) {
    return null;
  }

  return (
    <div 
      className={`${sizeClasses} mx-auto flex flex-col items-center justify-center border border-border/50 rounded-xl bg-muted/10 p-2 transition-all duration-300 relative overflow-hidden`}
      id={`ad-active-${id}`}
    >
      {/* Header labels */}
      <div className="w-full flex items-center justify-between text-[9px] text-muted-foreground/60 px-2 mb-0.5">
        <span className="font-semibold tracking-wider uppercase">Sponsored Recommendation</span>
      </div>

      {/* Simulated Ad Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-3">
        <h4 className="text-xs font-bold text-foreground/80 mb-1">
          {placement === 'sidebar' ? 'Premium Lending Partners' : 'Zero Brokerage Direct Mutual Funds'}
        </h4>
        <p className="text-[10px] text-muted-foreground/80 max-w-[280px] md:max-w-[450px] mb-2 leading-relaxed">
          {placement === 'sidebar' 
            ? 'Access loan offers from top banks with low rates and minimal documentation.' 
            : 'Track and invest in mutual fund SIPs directly without any fee or commission plans.'
          }
        </p>
        <a 
          href="#affiliates" 
          className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold bg-secondary text-secondary-foreground border border-border/60 rounded-md hover:bg-muted transition-all"
        >
          <span>View Partners</span>
          <ExternalLink className="h-2.5 w-2.5" />
        </a>
      </div>
    </div>
  );
}
