/**
 * Promotion Core Schema
 * @module shared-schemas/marketing
 *
 * Promotion entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { MoneySchema } from '../common/primitives/money.schema';
import { PROMOTION } from '@vubon/shared-constants/marketing';
import { PromotionTypeSchema, PromotionAppliesToSchema } from './promotion-type.schema';
import { PromotionStatusSchema } from './promotion-status.schema';
import { PromotionDiscountTypeValueSchema } from './promotion-discount-type.schema';

export const PromotionSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(PROMOTION.NAME_MAX_LENGTH),
  description: z.string().max(PROMOTION.DESCRIPTION_MAX_LENGTH).optional(),
  type: PromotionTypeSchema,
  status: PromotionStatusSchema,
  discountType: PromotionDiscountTypeValueSchema,
  appliesTo: PromotionAppliesToSchema,
  discountValue: z.number().positive(),
  maxDiscountAmount: MoneySchema.optional(),
  minOrderAmount: MoneySchema.optional(),
  maxUses: z.number().int().positive().max(PROMOTION.MAX_USES),
  usedCount: z.number().int().nonnegative(),
  maxUsesPerUser: z.number().int().positive().max(PROMOTION.MAX_USES_PER_USER),
  applicableIds: z.array(UuidSchema).max(1000).optional(),
  excludedIds: z.array(UuidSchema).max(1000).optional(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  isStackable: z.boolean(),
  isActive: z.boolean(),
  createdBy: UuidSchema,
});

export const PromotionPublicSchema = PromotionSchema.pick({
  id: true,
  name: true,
  type: true,
  discountType: true,
  appliesTo: true,
  discountValue: true,
  startAt: true,
  endAt: true,
});

export const PromotionSummarySchema = PromotionSchema.pick({
  id: true,
  name: true,
  type: true,
  status: true,
  discountType: true,
  discountValue: true,
});

export const PromotionListFilterSchema = z.object({
  type: PromotionTypeSchema.optional(),
  status: PromotionStatusSchema.optional(),
  appliesTo: PromotionAppliesToSchema.optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
});

export type PromotionSchemaType = z.infer<typeof PromotionSchema>;
export type PromotionPublicSchemaType = z.infer<typeof PromotionPublicSchema>;
export type PromotionSummarySchemaType = z.infer<typeof PromotionSummarySchema>;
export type PromotionListFilterSchemaType = z.infer<typeof PromotionListFilterSchema>;
