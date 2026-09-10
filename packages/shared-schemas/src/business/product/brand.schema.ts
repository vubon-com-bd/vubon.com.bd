import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { BRAND } from '@vubon/shared-constants/src/business/product/brand.constants';

const brandStatusKeys = Object.keys(BRAND.STATUS) as [string, ...string[]];

export const BrandSchema = BaseSchema.extend({
  brandId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().max(500).optional(),
  status: z.enum(brandStatusKeys),
  logo: z.string().url().optional(),
  website: z.string().url().optional(),
  productCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  metadata: z
    .object({
      seoTitle: z.string().max(60).optional(),
      seoDescription: z.string().max(160).optional(),
      isFeatured: z.boolean().default(false),
    })
    .optional(),
});
