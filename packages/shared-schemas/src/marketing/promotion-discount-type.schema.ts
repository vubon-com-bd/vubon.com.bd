/**
 * Promotion Discount Type Schema
 * @module shared-schemas/marketing
 */

import { z } from 'zod';

export const PromotionDiscountTypeValueSchema = z.enum([
  'percentage',
  'fixed',
  'buy_x_get_y',
  'tiered',
  'bundle',
  'free_shipping',
  'cashback',
]);

export type PromotionDiscountTypeValueSchemaType = z.infer<typeof PromotionDiscountTypeValueSchema>;
