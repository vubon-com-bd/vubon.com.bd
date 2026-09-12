import { z } from 'zod';
import { StatusSchema } from '../common/status.schema';
import { PROMOTION_STATUS } from '@vubon/shared-constants/src/marketing/promotion-status.constants';

const promotionStatusKeys = Object.keys(PROMOTION_STATUS) as [string, ...string[]];

export const PromotionStatusSchema = StatusSchema.extend({
  status: z.enum(promotionStatusKeys),
  category: z.literal('promotion'),
  isDraft: z.boolean().default(false),
  isPending: z.boolean().default(false),
  isActive: z.boolean().default(false),
  isInactive: z.boolean().default(false),
  isExpired: z.boolean().default(false),
  isCancelled: z.boolean().default(false),
  isCompleted: z.boolean().default(false),
});

export const PromotionStatusEnumSchema = z.enum(promotionStatusKeys);
