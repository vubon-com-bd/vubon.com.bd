/**
 * Saga Error
 * @module shared-kernel/application/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from './application.error';

export class SagaError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(
    message: string,
    public readonly sagaName?: string,
    public readonly step?: string,
    public readonly compensated?: boolean
  ) {
    super(message, { sagaName, step, compensated });
    this.name = 'SagaError';
  }
}
