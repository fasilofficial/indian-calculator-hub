'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AmortizationRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

interface AmortizationScheduleProps {
  schedule: AmortizationRow[];
}

export default function AmortizationSchedule({ schedule }: AmortizationScheduleProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(schedule.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const selectedRows = schedule.slice(startIndex, startIndex + rowsPerPage);

  if (!schedule || schedule.length === 0) return null;

  return (
    <div className="w-full border border-border/85 rounded-xl bg-card overflow-hidden shadow-sm transition-all duration-300">
      <div className="border-b border-border bg-muted/40 px-5 py-4 flex items-center justify-between">
        <div>
          <h4 className="font-bold text-foreground text-sm">Amortization Schedule</h4>
          <p className="text-xs text-muted-foreground">Yearly repayment breakdown of your loan</p>
        </div>
        
        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-border bg-card hover:bg-muted text-foreground disabled:opacity-40 disabled:hover:bg-card transition-all"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs font-semibold text-foreground/80">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-border bg-card hover:bg-muted text-foreground disabled:opacity-40 disabled:hover:bg-card transition-all"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-muted-foreground font-bold uppercase tracking-wider">
              <th className="py-3 px-4 text-center w-[60px]">Year</th>
              <th className="py-3 px-4 text-right">Principal Paid</th>
              <th className="py-3 px-4 text-right">Interest Paid</th>
              <th className="py-3 px-4 text-right">Total Annual Paid</th>
              <th className="py-3 px-4 text-right">Ending Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {selectedRows.map((row) => {
              const totalPaid = row.principalPaid + row.interestPaid;

              return (
                <tr key={row.year} className="hover:bg-muted/20 transition-colors">
                  <td className="py-3.5 px-4 text-center font-extrabold text-foreground">
                    Yr {row.year}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-foreground/90">
                    ₹{row.principalPaid.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-destructive/95">
                    ₹{row.interestPaid.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-semibold text-primary">
                    ₹{totalPaid.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-foreground/95">
                    ₹{row.balance.toLocaleString('en-IN')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
