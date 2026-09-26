/**
 * Quantity Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const QuantitySchema = z
  .number()
  .int('Quantity must be an integer')
  .min(1, 'Quantity must be at least 1')
  .max(999999, 'Quantity is too large');

export const StockQuantitySchema = z
  .number()
  .int('Stock must be an integer')
  .min(0, 'Stock cannot be negative')
  .max(1000000000, 'Stock is too large');

export const OptionalQuantitySchema = QuantitySchema.optional();

export type QuantitySchemaType = z.infer<typeof QuantitySchema>;
export type StockQuantitySchemaType = z.infer<typeof StockQuantitySchema>;
