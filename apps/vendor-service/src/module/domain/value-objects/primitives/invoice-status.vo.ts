/**
 * InvoiceStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_INVOICE_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_INVOICE_STATUS) as readonly string[];

export class InvoiceStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): InvoiceStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid invoice status "${raw}"`, 'status');
    }
    return new InvoiceStatusVO(raw);
  }

  static draft(): InvoiceStatusVO { return new InvoiceStatusVO(VENDOR_INVOICE_STATUS.DRAFT); }
  static sent(): InvoiceStatusVO { return new InvoiceStatusVO(VENDOR_INVOICE_STATUS.SENT); }
  static viewed(): InvoiceStatusVO { return new InvoiceStatusVO(VENDOR_INVOICE_STATUS.VIEWED); }
  static paid(): InvoiceStatusVO { return new InvoiceStatusVO(VENDOR_INVOICE_STATUS.PAID); }
  static overdue(): InvoiceStatusVO { return new InvoiceStatusVO(VENDOR_INVOICE_STATUS.OVERDUE); }
  static cancelled(): InvoiceStatusVO { return new InvoiceStatusVO(VENDOR_INVOICE_STATUS.CANCELLED); }
  static refunded(): InvoiceStatusVO { return new InvoiceStatusVO(VENDOR_INVOICE_STATUS.REFUNDED); }

  static reconstitute(raw: string): InvoiceStatusVO { return new InvoiceStatusVO(raw); }

  isDraft(): boolean { return this.value === VENDOR_INVOICE_STATUS.DRAFT; }
  isSent(): boolean { return this.value === VENDOR_INVOICE_STATUS.SENT; }
  isViewed(): boolean { return this.value === VENDOR_INVOICE_STATUS.VIEWED; }
  isPaid(): boolean { return this.value === VENDOR_INVOICE_STATUS.PAID; }
  isOverdue(): boolean { return this.value === VENDOR_INVOICE_STATUS.OVERDUE; }
  isCancelled(): boolean { return this.value === VENDOR_INVOICE_STATUS.CANCELLED; }
  isRefunded(): boolean { return this.value === VENDOR_INVOICE_STATUS.REFUNDED; }

  isFinal(): boolean {
    return [VENDOR_INVOICE_STATUS.PAID, VENDOR_INVOICE_STATUS.CANCELLED, VENDOR_INVOICE_STATUS.REFUNDED].includes(this.value as never);
  }

  canTransitionTo(target: string): boolean {
    const t: Record<string, readonly string[]> = {
      [VENDOR_INVOICE_STATUS.DRAFT]: [VENDOR_INVOICE_STATUS.SENT, VENDOR_INVOICE_STATUS.CANCELLED],
      [VENDOR_INVOICE_STATUS.SENT]: [VENDOR_INVOICE_STATUS.VIEWED, VENDOR_INVOICE_STATUS.PAID, VENDOR_INVOICE_STATUS.OVERDUE, VENDOR_INVOICE_STATUS.CANCELLED],
      [VENDOR_INVOICE_STATUS.VIEWED]: [VENDOR_INVOICE_STATUS.PAID, VENDOR_INVOICE_STATUS.OVERDUE, VENDOR_INVOICE_STATUS.CANCELLED],
      [VENDOR_INVOICE_STATUS.OVERDUE]: [VENDOR_INVOICE_STATUS.PAID, VENDOR_INVOICE_STATUS.CANCELLED],
      [VENDOR_INVOICE_STATUS.PAID]: [VENDOR_INVOICE_STATUS.REFUNDED],
      [VENDOR_INVOICE_STATUS.CANCELLED]: [],
      [VENDOR_INVOICE_STATUS.REFUNDED]: [],
    };
    return (t[this.value] ?? []).includes(target);
  }
}
