/**
 * Command Error
 * @module shared-kernel/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from './application.error';

export class CommandError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;

  constructor(
    message: string,
    public readonly commandType?: string,
    public readonly commandId?: string
  ) {
    super(message, { commandType, commandId });
    this.name = 'CommandError';
  }
}

export class CommandValidationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;

  constructor(
    message: string,
    public readonly commandType: string,
    public readonly field?: string
  ) {
    super(message, { commandType, field });
    this.name = 'CommandValidationError';
  }
}
