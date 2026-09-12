import { z } from 'zod';
import { PRODUCT_TYPES } from '@vubon/shared-constants/src/business/product/product-type.constants';

const productTypeKeys = Object.keys(PRODUCT_TYPES) as [string, ...string[]];

export const ProductTypeSchema = z.object({
  type: z.enum(productTypeKeys),
  category: z.literal('product'),
  hasVariants: z.boolean().default(false),
  hasInventory: z.boolean().default(true),
  isPhysical: z.boolean().default(true),
  isDigital: z.boolean().default(false),
});

export const ProductTypeEnumSchema = z.enum(productTypeKeys);
