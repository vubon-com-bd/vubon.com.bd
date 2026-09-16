'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { Select, type SelectOption } from '../../primitives/Select';
import { cn } from '../../utils/cn';

export interface SortOption {
  readonly value: string;
  readonly label: string;
}

export interface SortBarProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly options: readonly SortOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly label?: string;
  readonly disabled?: boolean;
}

export const SortBar = forwardRef<HTMLDivElement, SortBarProps>(function SortBar(
  { options, value, onChange, label = 'Sort by', disabled, className, ...rest },
  ref,
) {
  const selectOptions: SelectOption[] = options.map((o) => ({
    value: o.value,
    label: o.label,
  }));

  return (
    <div ref={ref} className={cn('flex items-center gap-2', className)} {...rest}>
      <span className="text-xs text-slate-500">{label}</span>
      <Select
        sizeVariant="sm"
        value={value}
        options={selectOptions}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
      />
    </div>
  );
});

SortBar.displayName = 'SortBar';
