import { ERROR_CODE, type ErrorCodeType } from '@vubon/shared-constants/common';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

export class InvoiceOperationFailedError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.INVOICE_OPERATION_FAILED;
  readonly httpStatus = 400;
  constructor(reason: string) {
    super(`Invoice operation failed: ${reason}`, { reason });
  }
}

export class InvoiceNotFoundError extends ApplicationError {
  readonly code: ErrorCodeType = ERROR_CODE.INVOICE_NOT_FOUND;
  readonly httpStatus = 404;
  constructor(invoiceId: string) {
    super(`Invoice not found: ${invoiceId}`, { invoiceId });
  }
}
