import { z } from 'zod';
import { TIMESTAMP } from '@vubon/shared-constants/src/common/timestamp.constants';

/**
 * Timestamp value — accepts Date, Unix seconds (positive integer), or ISO string.
 */
export const TimestampValueSchema = z.union([
  z.date(),
  z.number().int().min(TIMESTAMP.UNIX_MIN).max(TIMESTAMP.UNIX_MAX),
  z.string().datetime(),
]);

/**
 * Object wrapper: { timestamp: ... }
 */
export const TimestampSchema = z.object({
  timestamp: TimestampValueSchema,
});

/**
 * Unix timestamp (seconds).
 */
export const UnixTimestampSchema = z.number().int().min(TIMESTAMP.UNIX_MIN).max(TIMESTAMP.UNIX_MAX);

/**
 * ISO datetime string.
 */
export const ISOTimestampSchema = z.string().datetime();
