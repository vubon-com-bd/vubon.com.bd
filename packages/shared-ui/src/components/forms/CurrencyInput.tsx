'use client';
import { forwardRef } from 'react';
import { Input } from '../../primitives/Input';
import type { InputProps } from '../../primitives/Input';

export interface CurrencyInputProps extends Omit<InputProps, 'type'> {
  readonly currency?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  function CurrencyInput({ currency = 'BDT', className, ...rest }, ref) {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500">
          {currency}
        </span>
        <Input
          ref={ref}
          type="text"
          inputMode="decimal"
          className={`pl-12 ${className ?? ''}`}
          {...rest}
        />
      </div>
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';
