import {
  ERROR_CODE,
  ERROR_CODE_MESSAGES,
} from '@vubon/shared-constants/src/common/error-code.constants';

/**
 * Error code type — derived from ERROR_CODE values (e.g. 'AUTH-001')
 */
export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

/**
 * Application error interface
 */
export interface AppError {
  code: ErrorCode;
  message: string;
  details?: unknown;
  stack?: string;
  timestamp: Date;
}

/**
 * Factory — creates an AppError with default message from ERROR_CODE_MESSAGES
 */
export function createError(code: ErrorCode, customMessage?: string, details?: unknown): AppError {
  return {
    code,
    message: customMessage ?? ERROR_CODE_MESSAGES[code] ?? 'Unknown error',
    details,
    timestamp: new Date(),
  };
}

/**
 * Type guard
 */
export function isAppError(value: unknown): value is AppError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'code' in value &&
    'message' in value &&
    'timestamp' in value
  );
}
