/**
 * Common - Root Barrel Export
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module common/index
 *
 * @description
 * Central export point for all cross-cutting concerns.
 * Organized by type: filters, interceptors, pipes.
 *
 * RULES:
 * ✅ ONLY re-exports - NO logic, NO initialization
 * ✅ NO side effects
 * ✅ Pure exports only
 * ✅ All exports are type-safe
 *
 * @example
 * // Import filters
 * import { HttpExceptionFilter } from '@vubon/common';
 *
 * // Import interceptors
 * import { LoggingInterceptor } from '@vubon/common';
 *
 * // Import pipes
 * import { ZodValidationPipe, createValidationPipe } from '@vubon/common';
 */

// ============================================================
// 1. Filters (Exception Handling)
// ============================================================
export {
  HttpExceptionFilter,
  HTTP_STATUS,
  ERROR_CODES as HTTP_ERROR_CODES,
} from './filters/http-exception.filter';

export type {
  ErrorResponse as HttpErrorResponse,
  ErrorCodeMapping,
} from './filters/http-exception.filter';

// ============================================================
// 2. Interceptors (Cross-Cutting Concerns)
// ============================================================
export {
  LoggingInterceptor,
} from './interceptors/logging.interceptor';

export type {
  LoggingOptions,
} from './interceptors/logging.interceptor';

// ============================================================
// 3. Pipes (Data Validation & Transformation)
// ============================================================
export {
  ZodValidationPipe,
  createValidationPipe,
} from './pipes/validation.pipe';

export type {
  ValidationError as ZodValidationError,
} from './pipes/validation.pipe';
