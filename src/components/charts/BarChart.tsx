'use client';

import { useState } from 'react';

interface BarSegment {
  label: string;
  value: number;
  color: string;
}

interface BarChartProps {
  data: BarSegment[];
}

export default function BarChart({ data }: BarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.map((item) => item.value), 1000);

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 min-h-[220px] animate-scale-in">
      <div className="w-full flex items-end justify-around h-[160px] border-b border-border/80 pb-2 relative gap-4">
        
        {/* Horizontal gridlines */}
        <div className="absolute inset-x-0 top-[25%] border-t border-dashed border-border/40 pointer-events-none"></div>
        <div className="absolute inset-x-0 top-[50%] border-t border-dashed border-border/40 pointer-events-none"></div>
        <div className="absolute inset-x-0 top-[75%] border-t border-dashed border-border/40 pointer-events-none"></div>

        {data.map((item, index) => {
          const heightPct = (item.value / maxValue) * 100;
          const isHovered = hoveredIndex === index;

          return (
            <div 
              key={index}
              className="flex flex-col items-center w-full max-w-[100px] group cursor-pointer z-10"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip on top */}
              <div 
                className={`mb-2 px-2.5 py-1 rounded bg-foreground text-background text-[10px] font-bold shadow-md transition-all duration-200 truncate max-w-[120px] ${
                  isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
              >
                ₹{item.value.toLocaleString('en-IN')}
              </div>

              {/* Bar Cylinder */}
              <div className="w-full bg-secondary rounded-t-lg overflow-hidden h-[120px] flex items-end">
                <div 
                  className="w-full rounded-t-md transition-all duration-700 ease-out"
                  style={{ 
                    height: `${heightPct}%`, 
                    backgroundColor: item.color,
                    opacity: hoveredIndex !== null && !isHovered ? 0.6 : 1,
                    boxShadow: isHovered ? '0 0 12px var(--color-primary)' : 'none'
                  }}
                />
              </div>

              {/* Value Label */}
              <span className="text-[11px] font-bold mt-2 text-foreground/80 truncate max-w-full">
                ₹{item.value.toLocaleString('en-IN')}
              </span>
            </div>
          );
        })}
      </div>

      {/* Axis Labels */}
      <div className="w-full flex justify-around mt-3">
        {data.map((item, index) => (
          <span 
            key={index} 
            className={`text-xs font-bold text-center w-full max-w-[100px] truncate ${
              hoveredIndex === index ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
}
