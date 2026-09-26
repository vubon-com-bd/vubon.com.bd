import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class ShippingRateNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SHIPPING_RATE_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(courierId: string, weight: number) {
    super(`Shipping rate not found: ${courierId} @ ${weight}kg`, { courierId, weight });
  }
}

export class WeightLimitExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.WEIGHT_LIMIT_EXCEEDED;
  readonly httpStatus = 400;

  constructor(weight: number, maxWeight: number) {
    super(`Weight limit exceeded: ${weight}kg > ${maxWeight}kg`, { weight, maxWeight });
  }
}
