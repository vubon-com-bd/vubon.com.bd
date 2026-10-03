import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { badgeVariants } from './badge.variants';
import type { BadgeProps } from './badge.types';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, size, className, children, ...rest },
  ref
) {
  return (
    <span ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...rest}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
