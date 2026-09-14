/**
 * Timezone Schema
 * @module shared-schemas/common/geo
 *
 * Values আসে shared-constants/common/timezone.constants থেকে।
 */

import { z } from 'zod';
import { TIMEZONE } from '@vubon/shared-constants/common';

export const TimezoneValueSchema = z.enum(Object.values(TIMEZONE) as [string, ...string[]]);

export const TimezoneInfoSchema = z.object({
  value: TimezoneValueSchema,
  label: z.string().min(1).max(100),
  offsetMinutes: z.number().int().min(-720).max(840),
  isDst: z.boolean(),
  abbreviation: z.string().min(1).max(10),
  utcOffset: z.string().regex(/^[+-]\d{2}:\d{2}$/, 'Invalid UTC offset format'),
});

export const TimezoneConversionSchema = z.object({
  from: TimezoneValueSchema,
  to: TimezoneValueSchema,
  original: z.string(),
  converted: z.string(),
});

export type TimezoneValueSchemaType = z.infer<typeof TimezoneValueSchema>;
export type TimezoneInfoSchemaType = z.infer<typeof TimezoneInfoSchema>;
export type TimezoneConversionSchemaType = z.infer<typeof TimezoneConversionSchema>;
