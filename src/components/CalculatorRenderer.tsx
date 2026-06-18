'use client';

import { useState, useMemo } from 'react';
import { CalculatorConfig } from '@/types/calculator';
import DonutChart from './charts/DonutChart';
import BarChart from './charts/BarChart';
import AmortizationSchedule from './charts/AmortizationSchedule';
import AdSenseSlot from './AdSenseSlot';
import { Play } from 'lucide-react';

import { getCalculatorBySlug } from '@/data/calculators';

interface CalculatorRendererProps {
  slug: string;
}

export default function CalculatorRenderer({ slug }: CalculatorRendererProps) {
  const config = getCalculatorBySlug(slug);

  // Initialize state with default values from config
  const initialValues = useMemo(() => {
    const vals: Record<string, any> = {};
    if (config) {
      config.inputs.forEach((input) => {
        vals[input.id] = input.defaultValue;
      });
    }
    return vals;
  }, [config]);

  const [inputs, setInputs] = useState<Record<string, any>>(initialValues);

  if (!config) return null;

  // Perform calculations reactively on input changes
  const results = useMemo(() => {
    try {
      return config.calculate(inputs);
    } catch (err) {
      console.error('Calculation error:', err);
      return {};
    }
  }, [config, inputs]);

  const handleInputChange = (id: string, value: any) => {
    setInputs((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Format utility
  const formatOutput = (value: any, type: string) => {
    if (typeof value === 'string') return value;
    if (value === undefined || value === null || isNaN(value)) return '—';

    switch (type) {
      case 'currency':
        return `₹${Number(value).toLocaleString('en-IN')}`;
      case 'percentage':
        return `${value}%`;
      case 'years':
        return `${value} Years`;
      default:
        return value.toString();
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-stretch animate-slide-up">
      {/* Inputs Column */}
      <div className="flex-1 border border-border/80 rounded-2xl bg-card p-6 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-6 border-b border-border/60 pb-3">
            <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Play className="h-4 w-4 fill-primary/25 text-primary" />
            </div>
            <h3 className="font-bold text-foreground text-base">Adjust Inputs</h3>
          </div>

          <div className="space-y-6">
            {config.inputs.map((input) => {
              const val = inputs[input.id] ?? input.defaultValue;

              return (
                <div key={input.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-foreground/80">
                    <label htmlFor={`input-ctrl-${input.id}`}>{input.label}</label>
                    
                    {/* Compact input field linked to slider */}
                    {input.type !== 'select' && (
                      <div className="flex items-center gap-1 border border-border bg-muted/30 rounded px-1.5 py-0.5 max-w-[120px]">
                        <input
                          type="number"
                          id={`input-num-${input.id}`}
                          value={val}
                          min={input.min}
                          max={input.max}
                          step={input.step}
                          onChange={(e) => {
                            let n = parseFloat(e.target.value);
                            if (isNaN(n)) n = 0;
                            handleInputChange(input.id, n);
                          }}
                          className="w-full text-right outline-none bg-transparent font-mono text-xs font-extrabold text-foreground"
                        />
                        {input.unit && <span className="text-[10px] text-muted-foreground font-semibold">{input.unit}</span>}
                      </div>
                    )}
                  </div>

                  {/* Render Slider */}
                  {input.type === 'range' && (
                    <div className="flex items-center gap-4 py-1">
                      <input
                        type="range"
                        id={`input-ctrl-${input.id}`}
                        min={input.min}
                        max={input.max}
                        step={input.step}
                        value={val}
                        onChange={(e) => handleInputChange(input.id, parseFloat(e.target.value))}
                        className="flex-1"
                      />
                    </div>
                  )}

                  {/* Render Select Dropdown */}
                  {input.type === 'select' && (
                    <select
                      id={`input-ctrl-${input.id}`}
                      value={val}
                      onChange={(e) => handleInputChange(input.id, e.target.value)}
                      className="w-full border border-border bg-card hover:bg-muted/20 text-foreground px-3 py-2 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    >
                      {input.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* Min / Max bounds indicator */}
                  {input.type === 'range' && (
                    <div className="flex justify-between text-[10px] text-muted-foreground/80 font-mono font-medium">
                      <span>{input.unit === '₹' ? '₹' : ''}{input.min?.toLocaleString('en-IN')}{input.unit !== '₹' ? ` ${input.unit}` : ''}</span>
                      <span>{input.unit === '₹' ? '₹' : ''}{input.max?.toLocaleString('en-IN')}{input.unit !== '₹' ? ` ${input.unit}` : ''}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ad block below inputs for optimal monetization */}
        <div className="mt-8 border-t border-border/60 pt-6">
          <AdSenseSlot id="calc-in-feed" placement="above-results" />
        </div>
      </div>

      {/* Results Column */}
      <div className="flex-1 border border-border/80 rounded-2xl bg-card p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-extrabold text-foreground text-lg mb-6 border-b border-border/60 pb-3">
            Calculation Results
          </h3>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {config.outputs.map((output) => {
              const rawVal = results[output.id];
              const isRecommended = output.id === 'recommendedRegime';

              return (
                <div 
                  key={output.id} 
                  className={`border border-border/60 rounded-xl p-4 shadow-sm bg-muted/10 hover:bg-muted/20 transition-all ${
                    isRecommended ? 'col-span-2 border-primary/20 bg-primary/5' : ''
                  }`}
                >
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                    {output.label}
                  </span>
                  <span className={`text-base font-extrabold text-foreground mt-1.5 block truncate ${
                    isRecommended ? 'text-primary' : ''
                  }`}>
                    {formatOutput(rawVal, output.type)}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Render SVG Chart */}
          {config.chartType !== 'none' && results.chartData && (
            <div className="border border-border/40 rounded-xl p-4 bg-muted/5 mb-6">
              {config.chartType === 'donut' ? (
                <DonutChart data={results.chartData} />
              ) : (
                <BarChart data={results.chartData} />
              )}
            </div>
          )}

          {/* Amortization Schedule Table */}
          {results.amortizationSchedule && (
            <div className="mt-4">
              <AmortizationSchedule schedule={results.amortizationSchedule} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
