/**
 * InvoiceAmount Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Positive number
 * - Optional tax breakdown (subtotal + tax = total)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface InvoiceAmountValue {
  readonly subtotal: number;
  readonly taxAmount: number;
  readonly total: number;
  readonly currency: string;
}

export class InvoiceAmountVO extends BaseVO<InvoiceAmountValue> {
  private constructor(value: InvoiceAmountValue) {
    super(value);
  }

  static create(
    subtotal: number,
    taxAmount: number,
    currency: string,
  ): InvoiceAmountVO {
    if (!Number.isFinite(subtotal) || subtotal < 0) {
      throw new ValidationError('InvoiceAmount subtotal invalid', 'subtotal');
    }
    if (!Number.isFinite(taxAmount) || taxAmount < 0) {
      throw new ValidationError('InvoiceAmount taxAmount invalid', 'taxAmount');
    }
    if (typeof currency !== 'string' || currency.trim().length === 0) {
      throw new ValidationError('InvoiceAmount currency required', 'currency');
    }
    const round = (n: number): number => Math.round(n * 100) / 100;
    const total = round(subtotal + taxAmount);
    return new InvoiceAmountVO({
      subtotal: round(subtotal),
      taxAmount: round(taxAmount),
      total,
      currency: currency.toUpperCase(),
    });
  }

  static reconstitute(
    subtotal: number,
    taxAmount: number,
    total: number,
    currency: string,
  ): InvoiceAmountVO {
    return new InvoiceAmountVO({ subtotal, taxAmount, total, currency });
  }

  get subtotal(): number { return this.value.subtotal; }
  get taxAmount(): number { return this.value.taxAmount; }
  get total(): number { return this.value.total; }
  get currency(): string { return this.value.currency; }

  hasTax(): boolean {
    return this.taxAmount > 0;
  }
}
