/**
 * API Error Response Schema
 * @module shared-schemas/common/api
 *
 * ⚠️ Note: ErrorDetailSchema errors/base-error.schema.ts-এ আছে।
 * এখানে ApiErrorDetailSchema।
 */

import { z } from 'zod';

export const ApiErrorDetailSchema = z.object({
  field: z.string().optional(),
  message: z.string(),
  code: z.string().optional(),
  value: z.unknown().optional(),
});

export const ApiErrorSchema = z.object({
  code: z.string().min(1),
  message: z.string().min(1),
  statusCode: z.number().int().min(400).max(599),
  details: z.array(ApiErrorDetailSchema).optional(),
  field: z.string().optional(),
  path: z.string().optional(),
  timestamp: z.string().datetime().optional(),
  requestId: z.string().optional(),
});

export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: ApiErrorSchema,
  timestamp: z.string().datetime(),
  requestId: z.string().optional(),
});

export type ApiErrorDetailSchemaType = z.infer<typeof ApiErrorDetailSchema>;
export type ApiErrorSchemaType = z.infer<typeof ApiErrorSchema>;
export type ErrorResponseSchemaType = z.infer<typeof ErrorResponseSchema>;
