import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class WebhookProcessingFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.WEBHOOK_PROCESSING_FAILED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Webhook processing failed: ${reason}`, { reason });
  }
}

export class WebhookSignatureInvalidError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.WEBHOOK_SIGNATURE_INVALID;
  readonly httpStatus = 401;
  constructor() {
    super('Invalid webhook signature');
  }
}
