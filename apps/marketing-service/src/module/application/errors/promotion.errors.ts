import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class PromotionNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PROMOTION_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(promotionId: string) {
    super(`Promotion not found: ${promotionId}`, { promotionId });
  }
}

export class PromotionNotApplicableAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PROMOTION_NOT_APPLICABLE;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Promotion not applicable: ${reason}`, { reason });
  }
}

export class PromotionStackingAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.PROMOTION_STACKING_ERROR;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Promotion stacking error: ${reason}`, { reason });
  }
}
