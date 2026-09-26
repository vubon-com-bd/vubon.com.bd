'use client';
import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

export interface RadioOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface RadioGroupProps {
  readonly name: string;
  readonly options: readonly RadioOption[];
  readonly value: string | null;
  readonly onChange: (value: string) => void;
  readonly label?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly orientation?: 'vertical' | 'horizontal';
}

export const RadioGroup = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroup(
  { name, options, value, onChange, label, disabled, className, orientation = 'vertical' },
  ref
) {
  const groupId = useId();

  return (
    <fieldset
      ref={ref}
      aria-labelledby={label ? `${groupId}-label` : undefined}
      className={cn('flex flex-col gap-2', className)}
    >
      {label && (
        <legend id={`${groupId}-label`} className="text-sm font-medium text-slate-700">
          {label}
        </legend>
      )}
      <div
        role="radiogroup"
        className={cn('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'inline-flex items-center gap-2 text-sm',
              (disabled || opt.disabled) && 'opacity-50'
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={disabled || opt.disabled}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 border-slate-300 text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            {opt.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
});

RadioGroup.displayName = 'RadioGroup';
