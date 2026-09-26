'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CardBodyProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(function CardBody(
  { children, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('py-3', className)} {...rest}>
      {children}
    </div>
  );
});

CardBody.displayName = 'CardBody';
