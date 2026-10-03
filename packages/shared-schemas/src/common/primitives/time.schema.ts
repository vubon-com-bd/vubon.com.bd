/**
 * Time Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const TimeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, 'Time must be in HH:mm or HH:mm:ss format');

export const OptionalTimeSchema = TimeSchema.optional();

export type TimeSchemaType = z.infer<typeof TimeSchema>;
