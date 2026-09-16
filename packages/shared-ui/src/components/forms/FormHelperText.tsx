'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface FormHelperTextProps
  extends HTMLAttributes<HTMLParagraphElement> {
  readonly children?: React.ReactNode;
}

export const FormHelperText = forwardRef<
  HTMLParagraphElement,
  FormHelperTextProps
>(function FormHelperText({ className, children, ...rest }, ref) {
  if (!children) return null;
  return (
    <p
      ref={ref}
      className={cn('text-xs text-slate-500', className)}
      {...rest}
    >
      {children}
    </p>
  );
});

FormHelperText.displayName = 'FormHelperText';
