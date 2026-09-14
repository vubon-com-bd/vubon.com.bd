/**
 * Promotion Status Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/promotion.constants থেকে।
 */

import { z } from 'zod';
import { PROMOTION_STATUS } from '@vubon/shared-constants/marketing';

export const PromotionStatusSchema = z.enum(
  Object.values(PROMOTION_STATUS) as [string, ...string[]]
);

export type PromotionStatusSchemaType = z.infer<typeof PromotionStatusSchema>;
