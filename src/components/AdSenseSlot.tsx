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
    // Return empty placeholder with reserved size to prevent layout shifts if we just hide it (or return null if completely disabled)
    // To strictly avoid Layout Shift, keeping the container with the min-height is highly recommended!
    return (
      <div 
        className={`${sizeClasses} mx-auto flex items-center justify-center border border-dashed border-border rounded-lg bg-muted/20 text-xs text-muted-foreground transition-all duration-300`}
        id={`ad-placeholder-${id}`}
      >
        <span>Ad Slot ({placement}) - Disabled</span>
      </div>
    );
  }

  return (
    <div 
      className={`${sizeClasses} mx-auto flex flex-col items-center justify-center border border-border/80 rounded-lg bg-muted/40 p-2 shadow-sm transition-all duration-300 relative overflow-hidden group`}
      id={`ad-active-${id}`}
    >
      {/* Background decoration to make it look premium */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all duration-500"></div>
      
      {/* Header labels */}
      <div className="w-full flex items-center justify-between text-[10px] text-muted-foreground px-2 mb-1">
        <span className="font-semibold tracking-wider uppercase">Advertisement</span>
        <span className="font-mono">{dimensions}</span>
      </div>

      {/* Simulated Ad Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-3 z-10">
        <h4 className="text-sm font-semibold text-foreground/80 mb-1">
          {placement === 'sidebar' ? 'Sponsor Offering' : 'Grow Your Financial Net Worth'}
        </h4>
        <p className="text-xs text-muted-foreground max-w-[280px] md:max-w-[450px] mb-2 leading-relaxed">
          {placement === 'sidebar' 
            ? 'Compare interest rates from 30+ lenders in India. Get approved in 24 hours.' 
            : 'Open a zero-commission mutual fund account with India\'s top investment platform. Fast and secure paperless onboarding.'
          }
        </p>
        <a 
          href="#affiliates" 
          className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/95 transition-all shadow-sm"
        >
          <span>Learn More</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      <div className="w-full flex justify-end px-1 mt-1 text-[9px] text-muted-foreground/60">
        <span>AdSense ID: {id}</span>
      </div>
    </div>
  );
}
