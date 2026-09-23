import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class LoyaltyNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.LOYALTY_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(loyaltyId: string) {
    super(`Loyalty not found: ${loyaltyId}`, { loyaltyId });
  }
}

export class InsufficientPointsError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.LOYALTY_INSUFFICIENT_POINTS;
  readonly httpStatus = 400;

  constructor(available: number, required: number) {
    super(`Insufficient points: available ${available}, required ${required}`, {
      available,
      required,
    });
  }
}

export class TierNotMetError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.LOYALTY_TIER_NOT_MET;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Tier requirement not met: ${reason}`, { reason });
  }
}
