/**
 * Base Error Schema
 * @module shared-schemas/common/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে।
 */

import { z } from 'zod';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export const ErrorCodeSchema = z.enum(Object.values(ERROR_CODE) as [string, ...string[]]);

export const ErrorSeveritySchema = z.enum(['low', 'medium', 'high', 'critical']);

export const ErrorDetailSchema = z.object({
  field: z.string().optional(),
  message: z.string().min(1),
  code: z.string().optional(),
  value: z.unknown().optional(),
});

export const BaseErrorSchema = z.object({
  name: z.string().min(1),
  code: z.union([ErrorCodeSchema, z.string()]),
  message: z.string().min(1),
  severity: ErrorSeveritySchema.optional(),
  details: z.array(ErrorDetailSchema).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  timestamp: z.string().datetime().optional(),
  requestId: z.string().optional(),
});

export const ErrorContextSchema = z.object({
  requestId: z.string().optional(),
  userId: z.string().optional(),
  timestamp: z.string().datetime(),
  path: z.string().optional(),
  severity: ErrorSeveritySchema.optional(),
});

export type ErrorCodeSchemaType = z.infer<typeof ErrorCodeSchema>;
export type ErrorSeveritySchemaType = z.infer<typeof ErrorSeveritySchema>;
export type ErrorDetailSchemaType = z.infer<typeof ErrorDetailSchema>;
export type BaseErrorSchemaType = z.infer<typeof BaseErrorSchema>;
export type ErrorContextSchemaType = z.infer<typeof ErrorContextSchema>;
