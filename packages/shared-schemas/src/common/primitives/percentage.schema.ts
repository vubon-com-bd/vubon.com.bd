/**
 * Percentage Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const PercentageSchema = z
  .number()
  .min(0, 'Percentage cannot be negative')
  .max(100, 'Percentage cannot exceed 100')
  .multipleOf(0.01, 'Percentage must have at most 2 decimal places');

export const DiscountPercentageSchema = z
  .number()
  .min(0)
  .max(90, 'Discount cannot exceed 90%')
  .multipleOf(0.01);

export type PercentageSchemaType = z.infer<typeof PercentageSchema>;
export type DiscountPercentageSchemaType = z.infer<typeof DiscountPercentageSchema>;
