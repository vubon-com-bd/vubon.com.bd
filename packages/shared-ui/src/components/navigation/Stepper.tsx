'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface StepItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly description?: ReactNode;
}

export interface StepperProps extends HTMLAttributes<HTMLOListElement> {
  readonly steps: readonly StepItem[];
  readonly currentIndex: number;
  readonly orientation?: 'horizontal' | 'vertical';
}

export const Stepper = forwardRef<HTMLOListElement, StepperProps>(function Stepper(
  { steps, currentIndex, orientation = 'horizontal', className, ...rest },
  ref
) {
  return (
    <ol
      ref={ref}
      className={cn(
        'flex gap-3',
        orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
        className
      )}
      {...rest}
    >
      {steps.map((step, i) => {
        const status = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'upcoming';
        return (
          <li
            key={step.id}
            aria-current={status === 'current' ? 'step' : undefined}
            className={cn(
              'flex flex-1 items-center gap-2',
              orientation === 'vertical' && 'items-start'
            )}
          >
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                status === 'done' && 'bg-green-600 text-white',
                status === 'current' && 'bg-blue-600 text-white',
                status === 'upcoming' && 'bg-slate-200 text-slate-600'
              )}
              aria-hidden="true"
            >
              {status === 'done' ? '✓' : i + 1}
            </span>
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-sm',
                  status === 'current' ? 'font-medium text-slate-900' : 'text-slate-600'
                )}
              >
                {step.label}
              </span>
              {step.description && (
                <span className="text-xs text-slate-500">{step.description}</span>
              )}
            </div>
            {orientation === 'horizontal' && i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  'ml-2 h-px flex-1',
                  status === 'done' ? 'bg-green-600' : 'bg-slate-200'
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
});

Stepper.displayName = 'Stepper';
