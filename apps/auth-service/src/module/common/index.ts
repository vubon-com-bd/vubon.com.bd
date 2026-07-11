/**
 * Common Module - Barrel Export
 * 
 * @module common/index
 * 
 * @description
 * Central export point for all cross-cutting concerns.
 */

// Filters
export { HttpExceptionFilter, HTTP_ERROR_CODES } from './filters/http-exception.filter';
export type { ErrorResponse as HttpErrorResponse } from './filters/http-exception.filter';

// Interceptors
export { LoggingInterceptor } from './interceptors/logging.interceptor';
export type { LoggingOptions } from './interceptors/logging.interceptor';

// Pipes
export { ZodValidationPipe, createValidationPipe } from './pipes/validation.pipe';
export type { ValidationError as ZodValidationError } from './pipes/validation.pipe';
