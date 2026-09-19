/**
 * Business Rule Violation Error
 * @module shared-kernel/domain/errors
 *
 * Values আসে shared-constants/common/error.constants থেকে (value)।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { DomainError } from './domain.error';

export class BusinessRuleError extends DomainError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;

  constructor(
    message: string,
    public readonly rule: string,
    context?: Readonly<Record<string, unknown>>
  ) {
    super(message, { ...context, rule });
    this.name = 'BusinessRuleError';
  }
}
