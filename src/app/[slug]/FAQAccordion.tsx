'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CalculatorFAQ } from '@/types/calculator';

interface FAQAccordionProps {
  faqs: CalculatorFAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({
    0: true, // open the first FAQ by default
  });

  const toggleFAQ = (idx: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = !!openIndexes[index];

        return (
          <div 
            key={index} 
            className="border border-border/60 rounded-xl overflow-hidden bg-muted/10 transition-colors hover:bg-muted/20"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between text-left px-5 py-4 font-bold text-foreground text-xs sm:text-sm select-none"
            >
              <span>{faq.question}</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-primary flex-shrink-0" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              )}
            </button>
            
            {isOpen && (
              <div className="px-5 pb-4 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3 bg-card/40 animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
