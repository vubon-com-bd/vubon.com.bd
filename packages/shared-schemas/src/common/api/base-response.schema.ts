/**
 * Base Response Schema
 * @module shared-schemas/common/api
 *
 * সব API response-এর foundation schema।
 */

import { z } from 'zod';
import { ApiErrorSchema } from './error-response.schema';

export const BaseResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: ApiErrorSchema.optional(),
  timestamp: z.string().datetime(),
  requestId: z.string().optional(),
});

export const EmptyResponseSchema = z.object({
  success: z.literal(true),
  timestamp: z.string().datetime(),
  requestId: z.string().optional(),
});

export const AckResponseSchema = z.object({
  success: z.literal(true),
  message: z.string(),
  timestamp: z.string().datetime(),
});

export type BaseResponseSchemaType = z.infer<typeof BaseResponseSchema>;
export type EmptyResponseSchemaType = z.infer<typeof EmptyResponseSchema>;
export type AckResponseSchemaType = z.infer<typeof AckResponseSchema>;
