import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { ProductSchema } from '../business/product/product.schema';
import { PromotionTypeSchema } from './promotion-type.schema';
import { PromotionDiscountTypeSchema } from './promotion-discount-type.schema';
import { PROMOTION_STATUS } from '@vubon/shared-constants/src/marketing/promotion-status.constants';

const promotionStatusKeys = Object.keys(PROMOTION_STATUS) as [string, ...string[]];

export const PromotionSchema = BaseSchema.extend({
  promotionId: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().optional(),
  status: z.enum(promotionStatusKeys),
  type: PromotionTypeSchema,
  discountType: PromotionDiscountTypeSchema,
  discountValue: z.number().min(0),
  discountAmount: MoneySchema,
  minPurchaseAmount: MoneySchema.optional(),
  maxDiscountAmount: MoneySchema.optional(),
  products: z.array(ProductSchema),
  productCount: z.number().int().min(0).default(0),
  campaignId: z.string().uuid().optional(),
  usageLimit: z.number().int().min(1),
  usageCount: z.number().int().min(0).default(0),
  perUserLimit: z.number().int().min(1),
  perUserCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isValid: z.boolean().default(true),
  isStackable: z.boolean().default(false),
  startsAt: z.date(),
  endsAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});

export const PromotionCreateSchema = PromotionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  usageCount: true,
  perUserCount: true,
  productCount: true,
});

export const PromotionUpdateSchema = PromotionCreateSchema.partial();
