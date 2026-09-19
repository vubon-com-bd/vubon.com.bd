'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { buttonVariants } from './button.variants';
import type { ButtonProps } from './button.types';

/**
 * Base button.
 * - Semantic `<button>` with explicit `type`
 * - Loading state with aria-busy
 * - forwardRef + displayName
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    className,
    children,
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    type = 'button',
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className="animate-spin" aria-hidden="true">
          ⟳
        </span>
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  );
});

Button.displayName = 'Button';
