import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class InvalidPriceError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_OUT_OF_RANGE;
  readonly httpStatus = 400;

  constructor(amount: number, reason: string) {
    super(`Invalid price ${amount}: ${reason}`, { amount, reason });
  }
}

export class PricingRuleConflictError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(ruleType: string) {
    super(`Pricing rule conflict for type: ${ruleType}`, { ruleType });
  }
}

export class PricingRuleNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PRODUCT_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(ruleId: string) {
    super(`Pricing rule not found: ${ruleId}`, { ruleId });
  }
}
