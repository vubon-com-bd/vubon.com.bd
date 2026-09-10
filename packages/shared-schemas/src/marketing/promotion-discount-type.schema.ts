import { z } from 'zod';
import { PROMOTION_DISCOUNT_TYPE } from '@vubon/shared-constants/src/marketing/promotion-discount-type.constants';

const promotionDiscountTypeKeys = Object.keys(PROMOTION_DISCOUNT_TYPE.TYPES) as [
  string,
  ...string[],
];

export const PromotionDiscountTypeSchema = z.object({
  type: z.enum(promotionDiscountTypeKeys),
  category: z.literal('promotion_discount'),
  isPercentage: z.boolean().default(false),
  isFixed: z.boolean().default(false),
  isTiered: z.boolean().default(false),
  isVolume: z.boolean().default(false),
  isBundle: z.boolean().default(false),
});

export const PromotionDiscountTypeEnumSchema = z.enum(promotionDiscountTypeKeys);
