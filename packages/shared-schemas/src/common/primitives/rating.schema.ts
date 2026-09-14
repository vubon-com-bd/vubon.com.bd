/**
 * Rating Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const RatingSchema = z
  .number()
  .int('Rating must be an integer')
  .min(1, 'Rating must be at least 1')
  .max(5, 'Rating cannot exceed 5');

export const DecimalRatingSchema = z.number().min(0).max(5).multipleOf(0.1);

export type RatingSchemaType = z.infer<typeof RatingSchema>;
export type DecimalRatingSchemaType = z.infer<typeof DecimalRatingSchema>;
