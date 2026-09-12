import { z } from 'zod';
import { ERROR_CODE } from '@vubon/shared-constants/src/common/error-code.constants';

/**
 * Error CODE VALUES (e.g. 'AUTH-001', 'VAL-005') — not KEYS.
 */
const errorCodeValues = Object.values(ERROR_CODE) as [string, ...string[]];

export const ErrorSchema = z.object({
  code: z.enum(errorCodeValues),
  message: z.string(),
  details: z.unknown().optional(),
  stack: z.string().optional(),
  timestamp: z.date(),
});

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ErrorSchema,
});
