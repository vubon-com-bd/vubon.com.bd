/**
 * Base Error Types
 * @module shared-types/common/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে।
 *
 * ⚠️ Note: ErrorDetail common/api-তে আছে — এখানে DomainErrorDetail।
 */

import type { ERROR_CODE } from '@vubon/shared-constants/common';

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

export interface SerializedError {
  readonly name: string;
  readonly code: string;
  readonly message: string;
  readonly stack?: string;
  readonly cause?: SerializedError;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface ErrorMetadata {
  readonly code: ErrorCode | string;
  readonly statusCode?: number;
  readonly field?: string;
  readonly details?: readonly DomainErrorDetail[];
}

export interface DomainErrorDetail {
  readonly field?: string;
  readonly message: string;
  readonly code?: string;
  readonly value?: unknown;
}

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorContext {
  readonly requestId?: string;
  readonly userId?: string;
  readonly timestamp: string;
  readonly path?: string;
  readonly severity?: ErrorSeverity;
}
