/**
 * Invoice Domain Errors
 * @module payment-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

// ─── Not Found (404) ───────────────────────
export class InvoiceNotFoundError extends NotFoundError {
  constructor(invoiceId: string) {
    super('Invoice', invoiceId);
    this.name = 'InvoiceNotFoundError';
  }
}

// ─── Validation (422) ──────────────────────
export class InvalidInvoiceStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid invoice status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidInvoiceStatusError';
  }
}

export class InvalidInvoiceNumberError extends ValidationError {
  constructor(value: string) {
    super(`Invalid invoice number "${value}"`, 'invoiceNumber');
    this.name = 'InvalidInvoiceNumberError';
  }
}

// ─── Business Rule (400) ───────────────────
export class InvoiceOverdueError extends BusinessRuleError {
  constructor(invoiceId: string, dueAt: string) {
    super(`Invoice "${invoiceId}" overdue since ${dueAt}`, 'INVOICE_OVERDUE', {
      invoiceId,
      dueAt,
    });
    this.name = 'InvoiceOverdueError';
  }
}

export class InvoiceAlreadyPaidError extends BusinessRuleError {
  constructor(invoiceId: string) {
    super(`Invoice "${invoiceId}" is already paid`, 'INVOICE_ALREADY_PAID', { invoiceId });
    this.name = 'InvoiceAlreadyPaidError';
  }
}

export class InvalidInvoiceStatusTransitionError extends BusinessRuleError {
  constructor(from: string, to: string, invoiceId?: string) {
    super(
      `Cannot transition invoice status from "${from}" to "${to}"`,
      'INVALID_INVOICE_STATUS_TRANSITION',
      { from, to, invoiceId },
    );
    this.name = 'InvalidInvoiceStatusTransitionError';
  }
}
