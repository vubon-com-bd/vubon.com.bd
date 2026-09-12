import { z } from 'zod';

/**
 * A single date value — accepts Date or ISO string.
 *
 * Note: Name change — previously DateSchema was an object wrapper
 * ({ date: ... }) which was misleading. Now DateValueSchema validates
 * the value directly. Use DateObjectSchema when you need an object.
 */
export const DateValueSchema = z.union([z.date(), z.string().datetime()]);

/**
 * Object wrapper for a `date` field (kept for backward compatibility).
 */
export const DateObjectSchema = z.object({
  date: DateValueSchema,
});

/** @deprecated Use DateObjectSchema instead. */
export const DateSchema = DateObjectSchema;

/**
 * ISO date string only.
 */
export const DateStringSchema = z.string().datetime('Invalid date format');

/**
 * Date range with start ≤ end validation.
 * Uses coerce for safe comparison across Date | string.
 */
export const DateRangeSchema = z
  .object({
    startDate: DateValueSchema,
    endDate: DateValueSchema,
  })
  .refine((data) => new Date(data.startDate).getTime() <= new Date(data.endDate).getTime(), {
    message: 'Start date must be before end date',
  });
