/**
 * InvoiceNumber Value Object — INV-YYYYMM-<10-digit>
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_INVOICE } from '@vubon/shared-constants/business';

const PREFIX = VENDOR_INVOICE.PREFIX;
const NUMBER_LENGTH = VENDOR_INVOICE.NUMBER_LENGTH;
const PATTERN = new RegExp(`^${PREFIX}-\\d{6}-\\d{${NUMBER_LENGTH}}$`);

export class InvoiceNumberVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): InvoiceNumberVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Invoice number must be a string', 'invoiceNumber');
    }
    const normalized = raw.trim().toUpperCase();
    if (!PATTERN.test(normalized)) {
      throw new ValidationError(
        `Invoice number must match ${PREFIX}-YYYYMM-${'0'.repeat(NUMBER_LENGTH)}`,
        'invoiceNumber',
      );
    }
    return new InvoiceNumberVO(normalized);
  }

  static reconstitute(raw: string): InvoiceNumberVO {
    return new InvoiceNumberVO(raw);
  }

  static generate(sequence: number, at: Date = new Date()): InvoiceNumberVO {
    if (!Number.isInteger(sequence) || sequence < 0) {
      throw new ValidationError('Invoice sequence must be a non-negative integer', 'invoiceNumber');
    }
    const yyyy = at.getUTCFullYear();
    const mm = String(at.getUTCMonth() + 1).padStart(2, '0');
    const seq = String(sequence).padStart(NUMBER_LENGTH, '0');
    return new InvoiceNumberVO(`${PREFIX}-${yyyy}${mm}-${seq}`);
  }

  /** Extract the sequence number part. */
  getSequence(): number {
    const parts = this.value.split('-');
    return Number(parts[parts.length - 1]);
  }

  /** Extract the period (YYYYMM). */
  getPeriod(): string {
    const parts = this.value.split('-');
    return parts[parts.length - 2] ?? '';
  }
}
