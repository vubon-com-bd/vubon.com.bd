'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface PriceLineItem {
  readonly label: string;
  readonly amount: number;
  readonly emphasis?: boolean;
}

export interface PriceBreakdownProps extends HTMLAttributes<HTMLDivElement> {
  readonly items: readonly PriceLineItem[];
  readonly total: number;
  readonly currency?: string;
}

function fmt(n: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

export const PriceBreakdown = forwardRef<HTMLDivElement, PriceBreakdownProps>(
  function PriceBreakdown({ items, total, currency = 'BDT', className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5 text-sm', className)} {...rest}>
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              'flex justify-between',
              item.emphasis ? 'font-medium text-slate-900' : 'text-slate-600'
            )}
          >
            <span>{item.label}</span>
            <span>{fmt(item.amount, currency)}</span>
          </div>
        ))}
        <div className="mt-1 flex justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
          <span>Total</span>
          <span>{fmt(total, currency)}</span>
        </div>
      </div>
    );
  }
);

PriceBreakdown.displayName = 'PriceBreakdown';
