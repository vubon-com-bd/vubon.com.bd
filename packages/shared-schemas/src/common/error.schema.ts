/**
 * Error Schemas
 * Zod schemas for error handling and validation
 */

import { z } from 'zod';
import { ERROR_CODE } from '@vubon/shared-constants';
import type { ApiError, ApiErrorResponse } from '@vubon/shared-types';
import { httpStatusCodeSchema } from './status.schema';

/**
 * Error code schema
 */
export const errorCodeSchema = z.string().regex(/^ERR_[A-Z_]+_\d{3}$/);

/**
 * Base API error schema (as ZodObject for extend support)
 */
const baseApiErrorSchema = z.object({
  code: errorCodeSchema,
  message: z.string(),
  field: z.string().optional(),
  details: z.unknown().optional(),
});

/**
 * API error schema (as ZodType for type safety)
 */
export const apiErrorSchema = baseApiErrorSchema as z.ZodType<ApiError>;

/**
 * API error response schema
 */
export const apiErrorResponseSchema = z.object({
  status: httpStatusCodeSchema,
  data: z.null(),
  message: z.string(),
  timestamp: z.string().datetime(),
  path: z.string().optional(),
  errors: z.array(apiErrorSchema),
}) as z.ZodType<ApiErrorResponse>;

/**
 * Validation error schema
 * Uses baseApiErrorSchema for extend support
 */
export const validationErrorSchema = baseApiErrorSchema.extend({
  field: z.string(),
  code: z.literal(ERROR_CODE.VALIDATION_ERROR),
});

/**
 * Not found error schema
 */
export const notFoundErrorSchema = baseApiErrorSchema.extend({
  code: z.literal(ERROR_CODE.NOT_FOUND),
});

/**
 * Authentication error schema
 */
export const authErrorSchema = baseApiErrorSchema.extend({
  code: z.literal(ERROR_CODE.AUTH_ERROR),
});

/**
 * Authorization error schema
 */
export const permissionErrorSchema = baseApiErrorSchema.extend({
  code: z.literal(ERROR_CODE.PERMISSION_DENIED),
});

/**
 * Duplicate error schema
 */
export const duplicateErrorSchema = baseApiErrorSchema.extend({
  code: z.literal(ERROR_CODE.DUPLICATE_ENTRY),
});

/**
 * Validation error response schema
 */
export const validationErrorResponseSchema = z.object({
  status: z.number().int().default(400),
  data: z.null(),
  message: z.string().default('Validation failed'),
  timestamp: z.string().datetime(),
  path: z.string().optional(),
  errors: z.array(validationErrorSchema),
});

/**
 * Create error response helper
 */
export function createErrorResponse(
  code: string,
  message: string,
  status: number = 400
): ApiErrorResponse {
  return {
    status: status as ApiErrorResponse['status'],
    data: null,
    message,
    timestamp: new Date().toISOString(),
    errors: [{ code, message }],
  };
}
