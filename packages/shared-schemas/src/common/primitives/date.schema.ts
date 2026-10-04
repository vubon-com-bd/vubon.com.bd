/**
 * Date Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const DateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine(
    (val) => {
      const d = new Date(val);
      return !isNaN(d.getTime()) && d.toISOString().startsWith(val);
    },
    { message: 'Invalid date' }
  );

export const DateInputSchema = z.coerce.date();

export const OptionalDateStringSchema = DateStringSchema.optional();

export type DateStringSchemaType = z.infer<typeof DateStringSchema>;
export type DateInputSchemaType = z.infer<typeof DateInputSchema>;
