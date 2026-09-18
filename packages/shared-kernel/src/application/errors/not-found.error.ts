/**
 * Application Not Found Error
 * @module shared-kernel/application/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 *
 * ⚠️ Note: নাম ApplicationNotFoundError, কারণ domain/errors/not-found.error.ts-এ NotFoundError আছে।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from './application.error';

export class ApplicationNotFoundError extends ApplicationError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(
    public readonly resource: string,
    public readonly resourceId?: string
  ) {
    super(`${resource}${resourceId ? ` "${resourceId}"` : ''} not found`, { resource, resourceId });
    this.name = 'ApplicationNotFoundError';
  }
}
