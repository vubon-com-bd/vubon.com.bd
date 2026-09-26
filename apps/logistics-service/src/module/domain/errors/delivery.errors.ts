import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class DeliveryFailedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.DELIVERY_FAILED;
  readonly httpStatus = 500;

  constructor(deliveryId: string, reason: string) {
    super(`Delivery failed: ${reason}`, { deliveryId, reason });
  }
}

export class DeliveryWindowExpiredError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.DELIVERY_WINDOW_EXPIRED;
  readonly httpStatus = 410;

  constructor(deliveryId: string) {
    super(`Delivery window expired: ${deliveryId}`, { deliveryId });
  }
}

export class DeliveryAttemptExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.DELIVERY_ATTEMPT_EXCEEDED;
  readonly httpStatus = 409;

  constructor(deliveryId: string, attempts: number) {
    super(`Delivery attempt exceeded: ${attempts}`, { deliveryId, attempts });
  }
}
