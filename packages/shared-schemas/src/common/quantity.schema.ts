import { z } from 'zod';

export const QuantitySchema = z.object({
  value: z
    .number()
    .int('Quantity must be an integer')
    .min(0, 'Quantity must be positive')
    .max(999999, 'Quantity is too large'),
  unit: z.string().optional(),
});

export const QuantityNumberSchema = z.number().int().min(0).max(999999);
