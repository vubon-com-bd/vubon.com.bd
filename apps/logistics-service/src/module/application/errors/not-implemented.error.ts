/**
 * NotImplemented Application Error
 * @module logistics-service/application/errors
 *
 * Use when a feature is stubbed but not yet implemented.
 * Will be caught by HTTP layer → 501 Not Implemented.
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class NotImplementedError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 501;

  constructor(feature: string, context?: Readonly<Record<string, unknown>>) {
    super(`Not implemented: ${feature}`, { feature, ...context });
    this.name = 'NotImplementedError';
  }
}

export class NotImplementedAggregateError extends ApplicationError {
  readonly code = ERROR_CODE.LOGISTICS_GENERIC_FAILURE;
  readonly httpStatus = 501;

  constructor(aggregate: string, operation: string) {
    super(`[${aggregate}] ${operation} not implemented`, { aggregate, operation });
    this.name = 'NotImplementedAggregateError';
  }
}
