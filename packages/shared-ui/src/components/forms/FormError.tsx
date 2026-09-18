'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface FormErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly message?: string;
  readonly id?: string;
}

export const FormError = forwardRef<HTMLParagraphElement, FormErrorProps>(function FormError(
  { message, className, id, ...rest },
  ref
) {
  if (!message) return null;
  return (
    <p ref={ref} id={id} role="alert" className={cn('text-xs text-red-600', className)} {...rest}>
      {message}
    </p>
  );
});

FormError.displayName = 'FormError';
