'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly size?: ContainerSize;
  readonly centered?: boolean;
  readonly padded?: boolean;
}

const sizeClasses: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    { children, size = 'lg', centered = true, padded = true, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          sizeClasses[size],
          centered && 'mx-auto',
          padded && 'px-4 sm:px-6 lg:px-8',
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Container.displayName = 'Container';
