import { z } from 'zod';
import { StatusSchema } from '../../common/status.schema';
import { PRODUCT_STATUS } from '@vubon/shared-constants/src/business/product/product-status.constants';

const productStatusKeys = Object.keys(PRODUCT_STATUS) as [string, ...string[]];

export const ProductStatusSchema = StatusSchema.extend({
  status: z.enum(productStatusKeys),
  category: z.literal('product'),
  isActive: z.boolean().default(true),
  isPublished: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export const ProductStatusEnumSchema = z.enum(productStatusKeys);
