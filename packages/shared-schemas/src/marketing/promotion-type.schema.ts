/**
 * Promotion Type Schema
 * @module shared-schemas/marketing
 *
 * Values আসে shared-constants/marketing/promotion.constants থেকে।
 */

import { z } from 'zod';
import { PROMOTION_TYPE, PROMOTION_APPLIES_TO } from '@vubon/shared-constants/marketing';

export const PromotionTypeSchema = z.enum(Object.values(PROMOTION_TYPE) as [string, ...string[]]);

export const PromotionAppliesToSchema = z.enum(
  Object.values(PROMOTION_APPLIES_TO) as [string, ...string[]]
);

export type PromotionTypeSchemaType = z.infer<typeof PromotionTypeSchema>;
export type PromotionAppliesToSchemaType = z.infer<typeof PromotionAppliesToSchema>;
