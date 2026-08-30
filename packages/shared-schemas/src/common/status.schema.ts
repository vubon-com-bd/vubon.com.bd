/**
 * Status Schemas
 * Zod schemas for status codes and status objects
 */

import { z } from 'zod';
import { HTTP_STATUS } from '@vubon/shared-constants';
import type { Status } from '@vubon/shared-types';

/**
 * HTTP status code schema
 */
export const httpStatusCodeSchema = z.number().int().min(100).max(599);

/**
 * API status schema
 */
export const apiStatusSchema = z.enum(['success', 'error', 'warning', 'info']);

/**
 * Status schema
 */
export const statusSchema = z.enum(['active', 'inactive', 'pending', 'deleted']);

/**
 * HTTP status message schema
 */
export const httpStatusMessageSchema = z.string();

/**
 * Status response schema
 */
export const statusResponseSchema = z.object({
  status: httpStatusCodeSchema,
  message: httpStatusMessageSchema,
  timestamp: z.date().default(() => new Date()),
});

/**
 * HTTP Status enum from constants
 */
export const HttpStatus = HTTP_STATUS;

/**
 * Check if status code is successful
 */
export function isSuccessStatus(status: number): boolean {
  return status >= 200 && status < 300;
}

/**
 * Check if status code is client error
 */
export function isClientErrorStatus(status: number): boolean {
  return status >= 400 && status < 500;
}

/**
 * Check if status code is server error
 */
export function isServerErrorStatus(status: number): boolean {
  return status >= 500 && status < 600;
}

/**
 * Check if status code is redirection
 */
export function isRedirectionStatus(status: number): boolean {
  return status >= 300 && status < 400;
}

/**
 * Check if status code is error (client or server)
 */
export function isErrorStatus(status: number): boolean {
  return status >= 400 && status < 600;
}

/**
 * Get status category based on status code
 */
export function getStatusCategory(
  status: number
): 'informational' | 'success' | 'redirection' | 'clientError' | 'serverError' {
  if (status >= 100 && status < 200) return 'informational';
  if (status >= 200 && status < 300) return 'success';
  if (status >= 300 && status < 400) return 'redirection';
  if (status >= 400 && status < 500) return 'clientError';
  if (status >= 500 && status < 600) return 'serverError';
  throw new Error(`Unknown HTTP status code: ${status}`);
}

/**
 * Get status message for HTTP status code
 */
export function getStatusMessage(status: number): string {
  const messages: Record<number, string> = {
    [HTTP_STATUS.OK]: 'OK',
    [HTTP_STATUS.CREATED]: 'Created',
    [HTTP_STATUS.ACCEPTED]: 'Accepted',
    [HTTP_STATUS.NO_CONTENT]: 'No Content',
    [HTTP_STATUS.BAD_REQUEST]: 'Bad Request',
    [HTTP_STATUS.UNAUTHORIZED]: 'Unauthorized',
    [HTTP_STATUS.FORBIDDEN]: 'Forbidden',
    [HTTP_STATUS.NOT_FOUND]: 'Not Found',
    [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
    [HTTP_STATUS.CONFLICT]: 'Conflict',
    [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
    [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too Many Requests',
    [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
    [HTTP_STATUS.BAD_GATEWAY]: 'Bad Gateway',
    [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service Unavailable',
    [HTTP_STATUS.GATEWAY_TIMEOUT]: 'Gateway Timeout',
  };
  return messages[status] || 'Unknown Status Code';
}

/**
 * Check if status is valid
 */
export function isValidStatus(status: string): status is Status {
  return ['active', 'inactive', 'pending', 'deleted'].includes(status as Status);
}
