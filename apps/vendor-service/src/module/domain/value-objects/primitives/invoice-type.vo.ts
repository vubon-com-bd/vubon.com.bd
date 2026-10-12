/**
 * InvoiceType Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { VENDOR_INVOICE_TYPE } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_INVOICE_TYPE) as readonly string[];

export class InvoiceTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  protected static allowedValues(): ReadonlySet<string> { return new Set(ALLOWED); }

  static create(raw: string): InvoiceTypeVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid invoice type "${raw}"`, 'type');
    }
    return new InvoiceTypeVO(raw);
  }

  static reconstitute(raw: string): InvoiceTypeVO { return new InvoiceTypeVO(raw); }

  isPayable(): boolean {
    return [VENDOR_INVOICE_TYPE.COMMISSION, VENDOR_INVOICE_TYPE.SUBSCRIPTION, VENDOR_INVOICE_TYPE.PENALTY].includes(this.value as never);
  }

  isOrderRelated(): boolean { return this.value === VENDOR_INVOICE_TYPE.ORDER; }
  isPayoutRelated(): boolean { return this.value === VENDOR_INVOICE_TYPE.PAYOUT; }
  isAdjustment(): boolean { return this.value === VENDOR_INVOICE_TYPE.ADJUSTMENT; }
}
