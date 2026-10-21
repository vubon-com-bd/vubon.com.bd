/**
 * Refund Application Errors
 * @module payment-service/application/errors
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class RefundNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(refundId: string) {
    super('Refund', refundId);
    this.name = 'RefundNotFoundApplicationError';
  }
}

export class RefundRequestError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Refund request failed for payment "${paymentId}": ${reason}`, 'RequestRefund');
    this.name = 'RefundRequestError';
  }
}

export class RefundApprovalError extends CommandError {
  constructor(refundId: string, reason: string) {
    super(`Refund approval failed for "${refundId}": ${reason}`, 'ApproveRefund');
    this.name = 'RefundApprovalError';
  }
}

export class RefundRejectionError extends CommandError {
  constructor(refundId: string, reason: string) {
    super(`Refund rejection failed for "${refundId}": ${reason}`, 'RejectRefund');
    this.name = 'RefundRejectionError';
  }
}

export class PartialRefundError extends CommandError {
  constructor(paymentId: string, reason: string) {
    super(`Partial refund failed for payment "${paymentId}": ${reason}`, 'PartialRefund');
    this.name = 'PartialRefundError';
  }
}

export class RefundNotEligibleApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_REQUIRED;
  readonly httpStatus = 422;

  constructor(paymentId: string, reason: string) {
    super(`Refund not eligible for payment "${paymentId}": ${reason}`, { paymentId, reason });
    this.name = 'RefundNotEligibleApplicationError';
  }
}

export class RefundIdempotencyConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(key: string, existingId?: string) {
    super(`Idempotency key "${key}" already processed${existingId ? ` → ${existingId}` : ''}`, {
      key,
      existingId,
    });
    this.name = 'RefundIdempotencyConflictError';
  }
}
