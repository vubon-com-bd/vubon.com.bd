/**
 * Refund Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class RefundNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(refundId: string) {
    super('Refund', refundId);
    this.name = 'RefundNotFoundApplicationError';
  }
}

export class RefundRequestError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Refund request failed: ${reason}`, 'RefundRequest', undefined);
    void paymentId;
    this.name = 'RefundRequestError';
  }
}

export class RefundProcessingError extends CommandError {
  constructor(refundId: string, reason: string) {
    super(`Refund processing failed: ${reason}`, 'RefundProcessing', undefined);
    void refundId;
    this.name = 'RefundProcessingError';
  }
}

export class RefundNotEligibleError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;
  constructor(paymentId: string, reason: string) {
    super(`Payment "${paymentId}" not eligible for refund: ${reason}`, {
      paymentId,
      reason,
    });
    this.name = 'RefundNotEligibleError';
  }
}

export class RefundAmountExceededApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;
  constructor(paymentId: string, requested: number, available: number, currency: string) {
    super(
      `Refund amount ${requested} ${currency} exceeds available ${available} ${currency}`,
      { paymentId, requested, available, currency },
    );
    this.name = 'RefundAmountExceededApplicationError';
  }
}

export class RefundValidationError extends ApplicationValidationError {
  constructor(message: string, field?: string) {
    super(message, field);
    this.name = 'RefundValidationError';
  }
}
