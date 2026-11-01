'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Divider } from '../../primitives/Divider';
import { cn } from '../../utils/cn';

export interface DividerContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly label?: ReactNode;
  readonly spacing?: 'sm' | 'md' | 'lg';
}

export const DividerContainer = forwardRef<HTMLDivElement, DividerContainerProps>(
  function DividerContainer({ children, label, spacing = 'md', className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('flex flex-col', className)} {...rest}>
        <Divider {...(label !== undefined ? { label } : {})} spacing={spacing} />
        {children}
      </div>
    );
  }
);

DividerContainer.displayName = 'DividerContainer';
