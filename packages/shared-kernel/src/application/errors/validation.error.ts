/**
 * Application Validation Error
 * @module shared-kernel/application/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 *
 * ⚠️ Note: নাম ApplicationValidationError, কারণ domain/errors/validation.error.ts-এ ValidationError আছে।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from './application.error';

export class ApplicationValidationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;

  constructor(
    message: string,
    public readonly field?: string,
    public readonly details?: readonly {
      readonly field: string;
      readonly message: string;
    }[]
  ) {
    super(message, { field, details });
    this.name = 'ApplicationValidationError';
  }
}
