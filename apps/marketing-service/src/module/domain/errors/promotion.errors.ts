import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class PromotionNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PROMOTION_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(promotionId: string) {
    super(`Promotion not found: ${promotionId}`, { promotionId });
  }
}

export class PromotionNotApplicableError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PROMOTION_NOT_APPLICABLE;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Promotion not applicable: ${reason}`, { reason });
  }
}

export class PromotionStackingError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.PROMOTION_STACKING_ERROR;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Promotion stacking error: ${reason}`, { reason });
  }
}
