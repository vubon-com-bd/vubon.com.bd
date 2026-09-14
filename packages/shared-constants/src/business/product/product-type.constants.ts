export const PRODUCT_TYPE = {
  PHYSICAL: 'physical',
  DIGITAL: 'digital',
  SERVICE: 'service',
  SUBSCRIPTION: 'subscription',
  BUNDLE: 'bundle',
  VARIABLE: 'variable',
  SIMPLE: 'simple',
  GIFT_CARD: 'gift_card',
} as const;

export type ProductTypeType = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];
