/**
 * Zone application errors
 * @module logistics-service/application/errors
 */
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ERROR_CODE } from '@vubon/shared-constants/common';

export class ZoneNotFoundApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.ZONE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly zoneId: string) {
    super(`Zone "${zoneId}" not found`, { zoneId });
    this.name = 'ZoneNotFoundApplicationError';
  }
}

export class ZoneNotCoveredApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.ZONE_NOT_COVERED;
  readonly httpStatus = 422;
  constructor(public readonly address: string) {
    super(`Address "${address}" is not covered by any zone`, { address });
    this.name = 'ZoneNotCoveredApplicationError';
  }
}

export class ZoneOperationFailedApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 400;
  constructor(public readonly operation: string, reason: string, public readonly zoneId?: string) {
    super(`Zone ${operation} failed: ${reason}`, { operation, zoneId });
    this.name = 'ZoneOperationFailedApplicationError';
  }
}
