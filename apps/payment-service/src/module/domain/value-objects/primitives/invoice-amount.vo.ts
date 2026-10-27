/**
 * InvoiceAmount Value Object — Bangladesh Tax Breakdown
 * @module payment-service/domain/value-objects/primitives
 *
 * Bangladesh Tax Structure:
 * - Subtotal: Base price
 * - VAT (15%): Value Added Tax (NBR)
 * - SD (0-500%): Supplementary Duty (product-specific)
 * - AIT (5%): Advance Income Tax (vendor deduction)
 * - VDS: VAT Deduction at Source (entity-specific)
 *
 * Total = Subtotal + VAT + SD
 * (AIT/VDS are deductions, not additions)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface InvoiceTaxBreakdown {
  readonly vatRate: number;        // 15% standard
  readonly vatAmount: number;
  readonly sdRate: number;         // Supplementary Duty
  readonly sdAmount: number;
  readonly aitRate: number;        // Advance Income Tax (vendor deduction)
  readonly aitAmount: number;
  readonly vdsRate: number;        // VAT Deduction at Source
  readonly vdsAmount: number;
}

export interface InvoiceAmountValue {
  readonly subtotal: number;
  readonly taxAmount: number;       // Total tax (VAT + SD)
  readonly total: number;
  readonly currency: string;
  readonly tax?: InvoiceTaxBreakdown;
}

const BD_DEFAULT_VAT = 0.15;  // 15% standard
const BD_DEFAULT_SD = 0;      // Supplementary Duty (varies)
const BD_DEFAULT_AIT = 0.05;  // 5% for vendors
const BD_DEFAULT_VDS = 0;     // Depends on entity

export class InvoiceAmountVO extends BaseVO<InvoiceAmountValue> {
  private constructor(value: InvoiceAmountValue) {
    super(value);
  }

  /**
   * Simple create — no tax breakdown (legacy)
   */
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

  /**
   * Create with Bangladesh tax breakdown
   *
   * @example
   * InvoiceAmountVO.createWithBdTax({
   *   subtotal: 1000,
   *   currency: 'BDT',
   *   vatRate: 0.15,  // default 15%
   *   sdRate: 0.05,   // optional
   *   includeAit: true,
   *   includeVds: false,
   * })
   */
  static createWithBdTax(params: {
    subtotal: number;
    currency: string;
    vatRate?: number;
    sdRate?: number;
    aitRate?: number;
    vdsRate?: number;
    includeAit?: boolean;
    includeVds?: boolean;
  }): InvoiceAmountVO {
    const {
      subtotal,
      currency,
      vatRate = BD_DEFAULT_VAT,
      sdRate = BD_DEFAULT_SD,
      aitRate = BD_DEFAULT_AIT,
      vdsRate = BD_DEFAULT_VDS,
      includeAit = false,
      includeVds = false,
    } = params;

    if (!Number.isFinite(subtotal) || subtotal < 0) {
      throw new ValidationError('InvoiceAmount subtotal invalid', 'subtotal');
    }
    if (typeof currency !== 'string' || currency.trim().length === 0) {
      throw new ValidationError('InvoiceAmount currency required', 'currency');
    }

    const round = (n: number): number => Math.round(n * 100) / 100;

    // VAT and SD are additions (customer pays)
    const vatAmount = round(subtotal * vatRate);
    const sdAmount = round(subtotal * sdRate);
    const totalTax = round(vatAmount + sdAmount);
    const total = round(subtotal + totalTax);

    // AIT and VDS are deductions (vendor pays)
    const aitAmount = includeAit ? round(subtotal * aitRate) : 0;
    const vdsAmount = includeVds ? round(subtotal * vdsRate) : 0;

    return new InvoiceAmountVO({
      subtotal: round(subtotal),
      taxAmount: totalTax,
      total,
      currency: currency.toUpperCase(),
      tax: {
        vatRate,
        vatAmount,
        sdRate,
        sdAmount,
        aitRate: includeAit ? aitRate : 0,
        aitAmount,
        vdsRate: includeVds ? vdsRate : 0,
        vdsAmount,
      },
    });
  }

  static reconstitute(
    subtotal: number,
    taxAmount: number,
    total: number,
    currency: string,
    tax?: InvoiceTaxBreakdown,
  ): InvoiceAmountVO {
    return new InvoiceAmountVO({ subtotal, taxAmount, total, currency, tax });
  }

  get subtotal(): number { return this.value.subtotal; }
  get taxAmount(): number { return this.value.taxAmount; }
  get total(): number { return this.value.total; }
  get currency(): string { return this.value.currency; }
  get tax(): InvoiceTaxBreakdown | undefined { return this.value.tax; }

  hasTax(): boolean {
    return this.taxAmount > 0;
  }

  hasBdTaxBreakdown(): boolean {
    return this.value.tax !== undefined;
  }

  /**
   * Get formatted VAT amount for display
   */
  get vatAmount(): number {
    return this.value.tax?.vatAmount ?? 0;
  }

  /**
   * Get formatted SD amount for display
   */
  get sdAmount(): number {
    return this.value.tax?.sdAmount ?? 0;
  }

  /**
   * Get AIT deduction (for vendor payout)
   */
  get aitAmount(): number {
    return this.value.tax?.aitAmount ?? 0;
  }

  /**
   * Get VDS deduction
   */
  get vdsAmount(): number {
    return this.value.tax?.vdsAmount ?? 0;
  }

  /**
   * Net vendor payout after AIT/VDS deductions
   */
  get netVendorAmount(): number {
    return Math.round((this.value.subtotal - this.aitAmount - this.vdsAmount) * 100) / 100;
  }
}
