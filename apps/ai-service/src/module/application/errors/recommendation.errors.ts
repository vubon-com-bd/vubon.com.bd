import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class RecommendationNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_RECOMMENDATION_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(recommendationId: string) {
    super(`Recommendation not found: ${recommendationId}`, { recommendationId });
  }
}

export class NoRecommendationsError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_RECOMMENDATION_NO_RESULTS;
  readonly httpStatus = 404;

  constructor(userId: string) {
    super(`No recommendations available for user: ${userId}`, { userId });
  }
}

export class InsufficientHistoryError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_RECOMMENDATION_INSUFFICIENT_HISTORY;
  readonly httpStatus = 400;

  constructor(userId: string, required: number) {
    super(
      `Insufficient interaction history for user ${userId} (need ${required})`,
      { userId, required },
    );
  }
}

export class InvalidQueryError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.AI_SEARCH_INVALID_QUERY;
  readonly httpStatus = 400;

  constructor(reason: string) {
    super(`Invalid query: ${reason}`, { reason });
  }
}
