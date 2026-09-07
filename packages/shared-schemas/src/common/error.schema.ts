import { z } from 'zod';
import { ERROR_CODE } from '@vubon/shared-constants';

export const ErrorSchema = z.object({
  code: z.enum(Object.keys(ERROR_CODE) as [string, ...string[]]),
  message: z.string(),
  details: z.unknown().optional(),
  stack: z.string().optional(),
  timestamp: z.date(),
});

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ErrorSchema,
});
