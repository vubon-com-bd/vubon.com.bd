import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { DomainError } from '@vubon/shared-kernel/domain/errors/domain.error';

export class InvoiceNotFoundError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_NOT_FOUND;
  readonly httpStatus = 404;

  constructor(invoiceId: string) {
    super(`Invoice not found: ${invoiceId}`, { invoiceId });
  }
}

export class InvoiceOverdueError extends DomainError {
  readonly code: ErrorCodeType = ERROR_CODE.ORDER_ALREADY_CANCELLED;
  readonly httpStatus = 400;

  constructor(invoiceId: string) {
    super(`Invoice overdue: ${invoiceId}`, { invoiceId });
  }
}
