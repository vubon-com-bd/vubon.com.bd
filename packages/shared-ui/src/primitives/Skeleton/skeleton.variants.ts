import { cva, type VariantProps } from 'class-variance-authority';

export const skeletonVariants = cva('animate-pulse rounded bg-slate-200', {
  variants: {
    shape: {
      text: 'h-4 w-full',
      circle: 'rounded-full',
      rect: 'rounded-md',
    },
  },
  defaultVariants: {
    shape: 'text',
  },
});

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
