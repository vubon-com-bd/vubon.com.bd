import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class CampaignNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.CAMPAIGN_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(campaignId: string) {
    super(`Campaign not found: ${campaignId}`, { campaignId });
  }
}

export class BudgetExceededError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.MARKETING_BUDGET_EXCEEDED;
  readonly httpStatus = 400;

  constructor(amount: number) {
    super(`Budget exceeded: ${amount}`, { amount });
  }
}
