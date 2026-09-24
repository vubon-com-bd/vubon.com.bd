import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';
import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';

export class WebhookNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.SERVER_INTERNAL;
  readonly httpStatus = 404;

  constructor(id: string) {
    super(`Webhook not found: ${id}`, { id });
  }
}

export class WebhookSignatureError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.AUTH_FORBIDDEN;
  readonly httpStatus = 403;

  constructor() {
    super('Invalid webhook signature');
  }
}
