import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CourierNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.COURIER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(courierId: string) {
    super(`Courier not found: ${courierId}`, { courierId });
  }
}

export class CourierUnavailableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.COURIER_UNAVAILABLE;
  readonly httpStatus = 503;

  constructor(courierId: string) {
    super(`Courier unavailable: ${courierId}`, { courierId });
  }
}

export class CourierRateNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.COURIER_RATE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(courierId: string, zoneId?: string) {
    super(`Courier rate not found: ${courierId}${zoneId ? ` for zone ${zoneId}` : ''}`, {
      courierId,
      zoneId,
    });
  }
}
