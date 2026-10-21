/**
 * InvoiceNumber Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Format: INV-YYYY-NNNNNN (from order-regex.constants INVOICE_NUMBER_REGEX)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const INVOICE_PATTERN = /^INV-\d{4}-\d{6}$/;

export class InvoiceNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InvoiceNumberVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('InvoiceNumber cannot be empty', 'invoiceNumber');
    }
    const trimmed = raw.trim().toUpperCase();
    if (!INVOICE_PATTERN.test(trimmed)) {
      throw new ValidationError(
        `Invalid InvoiceNumber "${trimmed}". Format: INV-YYYY-NNNNNN`,
        'invoiceNumber',
      );
    }
    return new InvoiceNumberVO(trimmed);
  }

  static reconstitute(raw: string): InvoiceNumberVO {
    return new InvoiceNumberVO(raw);
  }

  get year(): number {
    return Number(this.value.split('-')[1]);
  }

  get sequence(): number {
    return Number(this.value.split('-')[2]);
  }
}
