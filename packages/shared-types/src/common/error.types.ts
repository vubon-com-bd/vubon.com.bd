import { ERROR_CODE } from '@vubon/shared-constants/src/common/error-code.constants';

/**
 * Error code type
 */
export type ErrorCode = keyof typeof ERROR_CODE;

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
