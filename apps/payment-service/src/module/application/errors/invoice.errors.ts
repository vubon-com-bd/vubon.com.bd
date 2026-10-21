/**
 * Invoice Application Errors
 * @module payment-service/application/errors
 *
 * ⚠️ Note: Application layer-এ class names-এ `Application` suffix ব্যবহার করা হয়।
 */
import { ERROR_CODE } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors/not-found.error';
import { CommandError } from '@vubon/shared-kernel/application/errors/command.error';

export class InvoiceNotFoundApplicationError extends ApplicationNotFoundError {
  constructor(invoiceId: string) {
    super('Invoice', invoiceId);
    this.name = 'InvoiceNotFoundApplicationError';
  }
}

export class InvoiceGenerationError extends CommandError {
  constructor(orderId: string, reason: string) {
    super(`Failed to generate invoice for order "${orderId}": ${reason}`, 'GenerateInvoice');
    this.name = 'InvoiceGenerationError';
  }
}

export class InvoiceSendError extends CommandError {
  constructor(invoiceId: string, reason: string) {
    super(`Failed to send invoice "${invoiceId}": ${reason}`, 'SendInvoice');
    this.name = 'InvoiceSendError';
  }
}

export class InvoiceVoidError extends CommandError {
  constructor(invoiceId: string, reason: string) {
    super(`Failed to void invoice "${invoiceId}": ${reason}`, 'VoidInvoice');
    this.name = 'InvoiceVoidError';
  }
}

/**
 * Renamed from `InvoiceAlreadyPaidError` → `InvoiceAlreadyPaidApplicationError`
 * to avoid collision with domain `InvoiceAlreadyPaidError`.
 */
export class InvoiceAlreadyPaidApplicationError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(invoiceId: string) {
    super(`Invoice "${invoiceId}" is already paid`, { invoiceId });
    this.name = 'InvoiceAlreadyPaidApplicationError';
  }
}

export class InvoiceNumberConflictError extends ApplicationError {
  readonly code = ERROR_CODE.VAL_DUPLICATE;
  readonly httpStatus = 409;

  constructor(invoiceNumber: string) {
    super(`Invoice number "${invoiceNumber}" already exists`, { invoiceNumber });
    this.name = 'InvoiceNumberConflictError';
  }
}
