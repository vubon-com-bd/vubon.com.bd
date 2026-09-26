import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class SmsNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SMS_MARKETING_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(smsId: string) {
    super(`SMS marketing not found: ${smsId}`, { smsId });
  }
}

export class SmsAlreadySentError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SMS_ALREADY_SENT;
  readonly httpStatus = 409;

  constructor(smsId: string) {
    super(`SMS already sent: ${smsId}`, { smsId });
  }
}
