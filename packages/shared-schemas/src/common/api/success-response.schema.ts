/**
 * API Success Response Schema
 * @module shared-schemas/common/api
 */

import { z } from 'zod';

export function createSuccessResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    timestamp: z.string().datetime(),
    requestId: z.string().optional(),
  });
}

export const MessageResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  timestamp: z.string().datetime(),
});

export function createCreatedResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.literal(true),
    data: dataSchema,
    location: z.string().optional(),
    timestamp: z.string().datetime(),
  });
}

export type MessageResponseSchemaType = z.infer<typeof MessageResponseSchema>;
