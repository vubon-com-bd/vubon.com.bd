import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class TierRequirementNotMetError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Tier requirement not met: ${reason}`, { reason });
  }
}

export class InvalidVendorTierError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_INVALID_FORMAT;
  readonly httpStatus = 400;

  constructor(value: string) {
    super(`Invalid vendor tier: ${value}`, { value });
  }
}
