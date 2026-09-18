'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SpacerProps extends HTMLAttributes<HTMLDivElement> {
  readonly size?: number | string;
  readonly axis?: 'horizontal' | 'vertical' | 'both';
  readonly flex?: boolean;
}

export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(function Spacer(
  { size, axis = 'vertical', flex, className, style, ...rest },
  ref
) {
  if (flex) {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn('flex-1', className)}
        style={style}
        {...rest}
      />
    );
  }

  const spacerStyle = {
    ...(axis === 'vertical' && size !== undefined && { height: size }),
    ...(axis === 'horizontal' && size !== undefined && { width: size }),
    ...(axis === 'both' && size !== undefined && { width: size, height: size }),
    ...style,
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn('shrink-0', className)}
      style={spacerStyle}
      {...rest}
    />
  );
});

Spacer.displayName = 'Spacer';
