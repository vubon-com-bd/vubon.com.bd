'use client';
import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { SwitchProps } from './switch.types';

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  function Switch(
    { checked, onCheckedChange, label, className, id, disabled, ...rest },
    ref,
  ) {
    const autoId = useId();
    const switchId = id ?? autoId;

    return (
      <div className="inline-flex items-center gap-2">
        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onCheckedChange(!checked)}
          className={cn(
            'relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            checked ? 'bg-blue-600' : 'bg-slate-300',
            className,
          )}
          {...rest}
        >
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform',
              checked ? 'translate-x-4' : 'translate-x-0',
            )}
          />
        </button>
        {label && (
          <label htmlFor={switchId} className="text-sm text-slate-700 select-none">
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
