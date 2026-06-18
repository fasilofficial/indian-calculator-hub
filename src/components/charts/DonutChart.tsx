'use client';

import { useState } from 'react';

interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  data: ChartSegment[];
}

export default function DonutChart({ data }: DonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // SVG calculations
  const size = 200;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let accumulatedPercentage = 0;

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-4 min-h-[200px]">
        <div className="w-24 h-24 rounded-full border-4 border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
          No Data
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-4">
      {/* Chart SVG */}
      <div className="relative w-[200px] h-[200px] flex-shrink-0 animate-scale-in">
        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`} 
          className="transform -rotate-90"
        >
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -((accumulatedPercentage / 100) * circumference);
            
            // Advance accumulative track
            accumulatedPercentage += percentage;

            const isHovered = hoveredIndex === index;

            return (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 cursor-pointer origin-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>

        {/* Center overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center p-4">
          <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
            {hoveredIndex !== null ? data[hoveredIndex].label : 'Total Value'}
          </span>
          <span className="text-sm font-extrabold text-foreground truncate max-w-[140px] mt-0.5">
            ₹{(hoveredIndex !== null ? data[hoveredIndex].value : total).toLocaleString('en-IN')}
          </span>
          {hoveredIndex !== null && (
            <span className="text-[10px] font-semibold text-primary mt-0.5 bg-primary/10 px-2 py-0.5 rounded-full">
              {((data[hoveredIndex].value / total) * 100).toFixed(1)}%
            </span>
          )}
        </div>
      </div>

      {/* Color Legend */}
      <div className="flex flex-col gap-3 flex-1 min-w-[140px]">
        {data.map((item, index) => {
          const pct = ((item.value / total) * 100).toFixed(1);
          const isHovered = hoveredIndex === index;

          return (
            <div 
              key={index}
              className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors cursor-pointer ${
                isHovered ? 'bg-muted/60' : 'hover:bg-muted/30'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <span 
                className="h-3.5 w-3.5 rounded mt-0.5 flex-shrink-0 transition-transform duration-200"
                style={{ 
                  backgroundColor: item.color,
                  transform: isHovered ? 'scale(1.15)' : 'scale(1)' 
                }}
              />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground/80 leading-none">
                  {item.label}
                </span>
                <span className="text-[11px] text-muted-foreground font-semibold mt-1">
                  ₹{item.value.toLocaleString('en-IN')} ({pct}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
