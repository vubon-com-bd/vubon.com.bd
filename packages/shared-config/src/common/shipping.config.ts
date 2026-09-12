export const shippingConfig = {
  defaultMethod: 'standard' as const,
  freeShippingThreshold: 500,
  defaultCost: 50,
  zones: ['domestic', 'international'],
  weightUnit: 'kg' as const,
  dimensionUnit: 'cm' as const,
} as const;
