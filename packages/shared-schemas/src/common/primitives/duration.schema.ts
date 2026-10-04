/**
 * Duration Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const DurationSecondsSchema = z
  .number()
  .int()
  .nonnegative()
  .max(315360000, 'Duration is too large');

export const DurationMinutesSchema = z.number().int().nonnegative().max(5256000);

export const DurationHoursSchema = z.number().int().nonnegative().max(87600);

export const DurationDaysSchema = z.number().int().nonnegative().max(3650);

export type DurationSecondsSchemaType = z.infer<typeof DurationSecondsSchema>;
