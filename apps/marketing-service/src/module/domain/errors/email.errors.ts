import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class EmailNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.EMAIL_MARKETING_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(emailId: string) {
    super(`Email marketing not found: ${emailId}`, { emailId });
  }
}

export class EmailAlreadySentError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.EMAIL_ALREADY_SENT;
  readonly httpStatus = 409;

  constructor(emailId: string) {
    super(`Email already sent: ${emailId}`, { emailId });
  }
}

export class SpamScoreTooHighError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.EMAIL_SPAM_SCORE_TOO_HIGH;
  readonly httpStatus = 400;

  constructor(score: number) {
    super(`Spam score too high: ${score}`, { score });
  }
}
