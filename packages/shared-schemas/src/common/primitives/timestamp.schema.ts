/**
 * Timestamp Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const IsoDateTimeSchema = z.string().datetime({ message: 'Invalid ISO 8601 datetime' });

export const TimestampSchema = z.number().int().nonnegative('Timestamp cannot be negative');

export const OptionalIsoDateTimeSchema = IsoDateTimeSchema.optional();

export type IsoDateTimeSchemaType = z.infer<typeof IsoDateTimeSchema>;
export type TimestampSchemaType = z.infer<typeof TimestampSchema>;
