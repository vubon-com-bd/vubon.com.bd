'use client';
import { forwardRef, useId } from 'react';
import { Checkbox } from '../../primitives/Checkbox';
import { cn } from '../../utils/cn';

export interface CheckboxOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface CheckboxGroupProps {
  readonly options: readonly CheckboxOption[];
  readonly value: readonly string[];
  readonly onChange: (value: readonly string[]) => void;
  readonly label?: string;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly orientation?: 'vertical' | 'horizontal';
}

export const CheckboxGroup = forwardRef<HTMLFieldSetElement, CheckboxGroupProps>(
  function CheckboxGroup(
    { options, value, onChange, label, disabled, className, orientation = 'vertical' },
    ref
  ) {
    const groupId = useId();

    const toggle = (v: string): void => {
      const has = value.includes(v);
      onChange(has ? value.filter((x) => x !== v) : [...value, v]);
    };

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
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap'
          )}
        >
          {options.map((opt) => (
            <Checkbox
              key={opt.value}
              checked={value.includes(opt.value)}
              disabled={disabled || opt.disabled}
              onChange={() => toggle(opt.value)}
              label={opt.label}
            />
          ))}
        </div>
      </fieldset>
    );
  }
);

CheckboxGroup.displayName = 'CheckboxGroup';
