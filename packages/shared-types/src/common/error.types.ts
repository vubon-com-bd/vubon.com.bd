import { ERROR_CODE } from '@vubon/shared-constants/src/common/error-code.constants';

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
