import { TAX_TYPE, TAX_CATEGORY } from './tax-type.constants';
import { TAX_RATE, TAX_RATE_TYPE, TAX_INCLUSION, TAX_RATE_LIMIT } from './tax-rate.constants';

export const TAX_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
  ARCHIVED: 'archived',
  EXPIRED: 'expired',
} as const;

export const TAX_APPLIES_TO = {
  PRODUCT: 'product',
  CATEGORY: 'category',
  BRAND: 'brand',
  SHIPPING: 'shipping',
  SERVICE: 'service',
  DIGITAL: 'digital',
  ORDER: 'order',
} as const;

export const TAX_REGION = {
  BD: 'bd',
  IN: 'in',
  US: 'us',
  EU: 'eu',
  UK: 'uk',
  AE: 'ae',
  SA: 'sa',
  GLOBAL: 'global',
} as const;

export const TAX = {
  TYPE: TAX_TYPE,
  CATEGORY: TAX_CATEGORY,
  STATUS: TAX_STATUS,
  APPLIES_TO: TAX_APPLIES_TO,
  REGION: TAX_REGION,
  RATE: TAX_RATE,
  RATE_TYPE: TAX_RATE_TYPE,
  INCLUSION: TAX_INCLUSION,
  LIMIT: TAX_RATE_LIMIT,
} as const;

export type TaxType = typeof TAX;
