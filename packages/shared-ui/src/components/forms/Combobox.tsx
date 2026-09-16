'use client';
import { forwardRef, useMemo, useState } from 'react';
import { Input } from '../../primitives/Input';
import { cn } from '../../utils/cn';

export interface ComboboxOption {
  readonly value: string;
  readonly label: string;
}

export interface ComboboxProps {
  readonly options: readonly ComboboxOption[];
  readonly value: string | null;
  readonly onChange: (value: string | null) => void;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly className?: string;
}

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  function Combobox(
    { options, value, onChange, placeholder, disabled, className },
    ref,
  ) {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);

    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return options;
      return options.filter((o) => o.label.toLowerCase().includes(q));
    }, [options, query]);

    const selected = options.find((o) => o.value === value);

    return (
      <div ref={ref} className={cn('relative', className)}>
        <Input
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          value={open ? query : (selected?.label ?? '')}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />
        {open && filtered.length > 0 && (
          <ul
            role="listbox"
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white shadow-lg"
          >
            {filtered.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={value === opt.value}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(opt.value);
                  setOpen(false);
                  setQuery('');
                }}
                className={cn(
                  'cursor-pointer px-3 py-2 text-sm hover:bg-slate-100',
                  value === opt.value && 'bg-blue-50 text-blue-700',
                )}
              >
                {opt.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Combobox.displayName = 'Combobox';
