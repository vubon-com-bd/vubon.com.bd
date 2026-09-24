import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class FeedbackNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(feedbackId: string) {
    super(`Feedback not found: ${feedbackId}`, { feedbackId });
  }
}

export class FeedbackAlreadySubmittedError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 409;

  constructor(userId: string) {
    super(`Feedback already submitted by user: ${userId}`, { userId });
  }
}
