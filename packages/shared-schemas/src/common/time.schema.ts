import { z } from 'zod';

/**
 * Time value object shape ({ hours, minutes, seconds }).
 *
 * Note: Name change — the previous TimeSchema was actually an object
 * wrapper. TimeObjectSchema is clearer. TimeStringSchema remains as
 * a validated string parser.
 */
export const TimeObjectSchema = z.object({
  hours: z.number().int().min(0).max(23),
  minutes: z.number().int().min(0).max(59),
  seconds: z.number().int().min(0).max(59).optional(),
});

/** @deprecated Use TimeObjectSchema instead. */
export const TimeSchema = TimeObjectSchema;

/**
 * 24-hour time string (HH:mm or HH:mm:ss).
 */
export const TimeStringSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/,
    'Invalid time format (expected HH:mm or HH:mm:ss)'
  );

/**
 * 12-hour time string with AM/PM.
 */
export const Time12HourSchema = z
  .string()
  .regex(/^(0?[1-9]|1[0-2]):[0-5]\d(:[0-5]\d)?\s?(AM|PM)$/i, 'Invalid 12-hour time format');
