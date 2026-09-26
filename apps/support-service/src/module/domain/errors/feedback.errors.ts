/**
 * Feedback domain errors
 * @module support-service/domain/errors
 */
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { FeedbackIdVO } from '../value-objects/primitives/feedback-id.vo';

export class FeedbackNotFoundError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_FEEDBACK_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(public readonly feedbackId: FeedbackIdVO) {
    super(`Feedback not found: ${feedbackId.value}`, { feedbackId: feedbackId.value });
    this.name = 'FeedbackNotFoundError';
  }
}

export class FeedbackAlreadySubmittedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_FEEDBACK_ALREADY_SUBMITTED;
  readonly httpStatus = 409;
  constructor(public readonly reference: string) {
    super(`Feedback already submitted for ${reference}`, { reference });
    this.name = 'FeedbackAlreadySubmittedError';
  }
}

export class FeedbackAlreadyReviewedError extends DomainError {
  readonly code = ERROR_CODE.SUPPORT_FEEDBACK_ALREADY_REVIEWED;
  readonly httpStatus = 409;
  constructor(public readonly feedbackId: FeedbackIdVO) {
    super(`Feedback already reviewed: ${feedbackId.value}`, { feedbackId: feedbackId.value });
    this.name = 'FeedbackAlreadyReviewedError';
  }
}
