import { z } from 'zod';
import { ERROR_CODE } from '@vubon/shared-constants/src/common/error-code.constants';

const errorKeys = Object.keys(ERROR_CODE) as [string, ...string[]];

export const ErrorSchema = z.object({
  code: z.enum(errorKeys),
  message: z.string(),
  details: z.unknown().optional(),
  stack: z.string().optional(),
  timestamp: z.date(),
});

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ErrorSchema,
});
