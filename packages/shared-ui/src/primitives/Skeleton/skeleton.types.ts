import type { HTMLAttributes } from 'react';
import type { SkeletonVariants } from './skeleton.variants';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement>, SkeletonVariants {
  readonly width?: number | string;
  readonly height?: number | string;
}
