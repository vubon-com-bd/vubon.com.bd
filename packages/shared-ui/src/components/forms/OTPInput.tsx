'use client';
import { forwardRef, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface OTPInputProps {
  readonly length?: number;
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly disabled?: boolean;
  readonly className?: string;
  readonly autoFocus?: boolean;
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(function OTPInput(
  { length = 6, value, onChange, disabled, className, autoFocus },
  ref
) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const setAt = (i: number, char: string): void => {
    const next = value.split('');
    next[i] = char;
    onChange(next.join('').slice(0, length));
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>): void => {
    const raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 1) {
      // paste
      const next = value.split('');
      for (let k = 0; k < raw.length && i + k < length; k++) {
        next[i + k] = raw.charAt(k);
      }
      onChange(next.join('').slice(0, length));
      const focusIndex = Math.min(i + raw.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
      return;
    }
    setAt(i, raw);
    if (raw && i < length - 1) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) inputsRef.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < length - 1) inputsRef.current[i + 1]?.focus();
  };

  return (
    <div
      ref={ref}
      role="group"
      aria-label="One-time password"
      className={cn('inline-flex gap-2', className)}
    >
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputsRef.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          disabled={disabled}
          autoFocus={autoFocus && i === 0}
          aria-label={`Digit ${i + 1}`}
          value={value[i] ?? ''}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="h-10 w-10 rounded-md border border-slate-300 text-center text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:bg-slate-100"
        />
      ))}
    </div>
  );
});

OTPInput.displayName = 'OTPInput';
