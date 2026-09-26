import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class EmailMarketingNotFoundAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.EMAIL_MARKETING_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(emailId: string) {
    super(`Email marketing not found: ${emailId}`, { emailId });
  }
}

export class EmailAlreadySentAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.EMAIL_ALREADY_SENT;
  readonly httpStatus = 409;

  constructor(emailId: string) {
    super(`Email already sent: ${emailId}`, { emailId });
  }
}

export class SpamScoreTooHighAppError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.EMAIL_SPAM_SCORE_TOO_HIGH;
  readonly httpStatus = 400;

  constructor(score: number) {
    super(`Spam score too high: ${score}`, { score });
  }
}
