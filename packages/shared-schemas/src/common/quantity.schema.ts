import { z } from 'zod';
import { QUANTITY } from '@vubon/shared-constants/src/common/quantity.constants';

/**
 * Quantity schema — uses QUANTITY constants.
 */
export const QuantitySchema = z.object({
  value: z
    .number()
    .int('Quantity must be an integer')
    .min(QUANTITY.MIN, 'Quantity must be positive')
    .max(QUANTITY.MAX, 'Quantity is too large'),
  unit: z.string().optional(),
});

export const QuantityNumberSchema = z.number().int().min(QUANTITY.MIN).max(QUANTITY.MAX);
