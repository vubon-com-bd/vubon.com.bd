'use client';
import { forwardRef, useCallback } from 'react';
import { Input } from '../../primitives/Input';
import type { InputProps } from '../../primitives/Input';

export interface NumberInputProps extends Omit<InputProps, 'type'> {
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly onValueChange?: (value: number | null) => void;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    { value, onChange, onValueChange, min, max, step = 1, ...rest },
    ref,
  ) {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        const raw = e.target.value;
        if (raw === '') {
          onValueChange?.(null);
          return;
        }
        const num = Number(raw);
        if (Number.isNaN(num)) return;
        if (min !== undefined && num < min) return;
        if (max !== undefined && num > max) return;
        onValueChange?.(num);
      },
      [onChange, onValueChange, min, max],
    );

    return (
      <Input
        ref={ref}
        type="number"
        inputMode="numeric"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        {...rest}
      />
    );
  },
);

NumberInput.displayName = 'NumberInput';
