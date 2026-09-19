'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { skeletonVariants } from './skeleton.variants';
import type { SkeletonProps } from './skeleton.types';

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { shape, width, height, className, style, ...rest },
  ref
) {
  const sizeStyle = {
    ...(width !== undefined && { width }),
    ...(height !== undefined && { height }),
    ...style,
  };
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(skeletonVariants({ shape }), className)}
      style={sizeStyle}
      {...rest}
    />
  );
});

Skeleton.displayName = 'Skeleton';
