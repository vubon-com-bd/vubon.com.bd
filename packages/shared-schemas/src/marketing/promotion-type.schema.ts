import { z } from 'zod';
import { PROMOTION_TYPE } from '@vubon/shared-constants/src/marketing/promotion-type.constants';

const promotionTypeKeys = Object.keys(PROMOTION_TYPE.TYPES) as [string, ...string[]];

export const PromotionTypeSchema = z.object({
  type: z.enum(promotionTypeKeys),
  category: z.literal('promotion_type'),
  isPercentage: z.boolean().default(false),
  isFixedAmount: z.boolean().default(false),
  isBuyXGetY: z.boolean().default(false),
  isFreeShipping: z.boolean().default(false),
  isGiftWithPurchase: z.boolean().default(false),
  isBundle: z.boolean().default(false),
  isCoupon: z.boolean().default(false),
  isVoucher: z.boolean().default(false),
  isFlashSale: z.boolean().default(false),
  isEarlyBird: z.boolean().default(false),
  isLastMinute: z.boolean().default(false),
  isVip: z.boolean().default(false),
  isCustom: z.boolean().default(false),
});

export const PromotionTypeEnumSchema = z.enum(promotionTypeKeys);
