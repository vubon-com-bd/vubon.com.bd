import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class CampaignOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 500;

  constructor(reason: string) {
    super(`Campaign operation failed: ${reason}`, { reason });
  }
}

export class CampaignNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.CAMPAIGN_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(campaignId: string) {
    super(`Campaign not found: ${campaignId}`, { campaignId });
  }
}

export class BudgetExceededAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.MARKETING_BUDGET_EXCEEDED;
  readonly httpStatus = 400;

  constructor(amount: number) {
    super(`Budget exceeded: ${amount}`, { amount });
  }
}
