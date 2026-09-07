import { ERROR_CODE } from '@vubon/shared-constants';

export type ErrorCode = keyof typeof ERROR_CODE;

export interface AppError {
  code: ErrorCode;
  message: string;
  details?: unknown;
  stack?: string;
  timestamp: Date;
}
