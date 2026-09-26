import { cva, type VariantProps } from 'class-variance-authority';

export type VariantBuilderConfig = Parameters<typeof cva>[1];

/**
 * Helper to define component variants.
 * Wraps `cva` with a naming convention.
 */
export function defineVariants<T extends VariantBuilderConfig>(
  base: string,
  config: T
): ReturnType<typeof cva> {
  return cva(base, config);
}

export type { VariantProps };
