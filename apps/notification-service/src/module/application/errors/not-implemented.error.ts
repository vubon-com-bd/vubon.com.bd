/**
 * NotImplementedError
 * @module notification-service/application/errors
 *
 * Temporary marker for business logic that requires domain VO assembly।
 * ⚠️ In production, this should never be thrown — it indicates a domain
 * factory that needs to be implemented in the domain layer।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';

export class NotImplementedError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 501;

  constructor(
    public readonly feature: string,
    public readonly requirement: string,
  ) {
    super(
      `Feature "${feature}" not implemented: ${requirement}`,
      { feature, requirement },
    );
    this.name = 'NotImplementedError';
  }
}
