import { z } from 'zod';
import { DEAL_DISCOUNT_TYPE } from '@vubon/shared-constants/src/business/flash-sales/deal-discount-type.constants';

const dealDiscountTypeKeys = Object.keys(DEAL_DISCOUNT_TYPE) as [string, ...string[]];

export const DealDiscountTypeSchema = z.object({
  type: z.enum(dealDiscountTypeKeys),
  category: z.literal('deal_discount'),
  isPercentage: z.boolean().default(false),
  isFixed: z.boolean().default(false),
  isTiered: z.boolean().default(false),
  isVolume: z.boolean().default(false),
  isBundle: z.boolean().default(false),
});

export const DealDiscountTypeEnumSchema = z.enum(dealDiscountTypeKeys);
