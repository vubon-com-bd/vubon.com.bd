/**
 * Feedback application errors
 * @module support-service/application/errors
 *
 * Registry: extends ApplicationError
 * Rule: `code` must be a known ERROR_CODE value; `httpStatus` required
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class FeedbackNotFoundException extends ApplicationError {
  readonly code = ERROR_CODE.SUPPORT_FEEDBACK_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(public readonly feedbackId: string) {
    super(`Feedback not found: ${feedbackId}`, { feedbackId });
    this.name = 'FeedbackNotFoundException';
  }
}

export class FeedbackAlreadyReviewedException extends ApplicationError {
  readonly code = ERROR_CODE.SUPPORT_FEEDBACK_ALREADY_REVIEWED;
  readonly httpStatus = 409;

  constructor(public readonly feedbackId: string) {
    super(`Feedback already reviewed: ${feedbackId}`, { feedbackId });
    this.name = 'FeedbackAlreadyReviewedException';
  }
}
