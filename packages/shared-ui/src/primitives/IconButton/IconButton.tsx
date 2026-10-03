'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { buttonVariants } from '../Button/button.variants';
import type { IconButtonProps } from './icon-button.types';

/**
 * Icon-only button.
 * Requires `aria-label` — the icon alone is not descriptive.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { variant, size = 'icon', className, children, type = 'button', ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...rest}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
});

IconButton.displayName = 'IconButton';
