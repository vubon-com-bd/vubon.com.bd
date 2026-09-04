/**
 * Product Type Constants
 * প্রোডাক্ট টাইপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { PRODUCT } from './product.constants';

export const PRODUCT_TYPES = {
  // Common types
  ...TYPES,

  // Product specific types
  PHYSICAL: PRODUCT.TYPES.PHYSICAL,
  DIGITAL: PRODUCT.TYPES.DIGITAL,
  SERVICE: PRODUCT.TYPES.SERVICE,
  SUBSCRIPTION: PRODUCT.TYPES.SUBSCRIPTION,
  DOWNLOADABLE: PRODUCT.TYPES.DOWNLOADABLE,
  VIRTUAL: PRODUCT.TYPES.VIRTUAL,

  // Additional product types
  BUNDLE: 'bundle',
  VARIABLE: 'variable',
  SIMPLE: 'simple',
  GROUPED: 'grouped',
  EXTERNAL: 'external',
  AFFILIATE: 'affiliate',
  CUSTOMIZABLE: 'customizable',
  RENTAL: 'rental',
} as const;

export type ProductTypeValue = (typeof PRODUCT_TYPES)[keyof typeof PRODUCT_TYPES];
