/**
 * Domain Not Found Error
 * @module shared-kernel/domain/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { DomainError } from './domain.error';

export class NotFoundError extends DomainError {
  readonly code = ERROR_CODE.USER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(
    public readonly entityType: string,
    public readonly entityId?: string
  ) {
    super(`${entityType}${entityId ? ` with id "${entityId}"` : ''} not found`, {
      entityType,
      entityId,
    });
    this.name = 'NotFoundError';
  }
}
