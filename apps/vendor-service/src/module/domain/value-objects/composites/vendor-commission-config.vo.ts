/**
 * VendorCommissionConfigVO — how the platform charges commission
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CommissionPercentVO } from '../primitives/commission-percent.vo.js';
import { CommissionAmountVO } from '../primitives/commission-amount.vo.js';
import { VENDOR_COMMISSION_TYPE } from '@vubon/shared-constants/business';

export type CommissionType = (typeof VENDOR_COMMISSION_TYPE)[keyof typeof VENDOR_COMMISSION_TYPE];

export interface VendorCommissionConfigVOProps {
  readonly type: CommissionType;
  readonly percent: CommissionPercentVO;
  readonly fixedAmount?: CommissionAmountVO;
  readonly applyOnShipping: boolean;
  readonly applyOnTax: boolean;
  readonly effectiveFrom: string;
  readonly effectiveTo?: string;
}

export class VendorCommissionConfigVO extends BaseVO<VendorCommissionConfigVOProps> {
  private constructor(props: VendorCommissionConfigVOProps) {
    super(props);
  }

  static create(props: VendorCommissionConfigVOProps): VendorCommissionConfigVO {
    const allowed = Object.values(VENDOR_COMMISSION_TYPE) as readonly string[];
    if (!allowed.includes(props.type)) {
      throw new ValidationError(`Invalid commission type "${props.type}"`, 'type');
    }
    if (!(props.percent instanceof CommissionPercentVO)) {
      throw new ValidationError('Commission config requires CommissionPercentVO', 'percent');
    }
    if (props.fixedAmount !== undefined && !(props.fixedAmount instanceof CommissionAmountVO)) {
      throw new ValidationError('Fixed amount must be CommissionAmountVO', 'fixedAmount');
    }
    // Business rule: FIXED / HYBRID must have a fixed amount
    if (
      (props.type === VENDOR_COMMISSION_TYPE.FIXED || props.type === VENDOR_COMMISSION_TYPE.HYBRID)
      && !props.fixedAmount
    ) {
      throw new ValidationError(
        `Commission type "${props.type}" requires a fixed amount`,
        'fixedAmount',
      );
    }
    if (props.effectiveTo && props.effectiveTo <= props.effectiveFrom) {
      throw new ValidationError('effectiveTo must be after effectiveFrom', 'effectiveTo');
    }
    return new VendorCommissionConfigVO(props);
  }

  static reconstitute(props: VendorCommissionConfigVOProps): VendorCommissionConfigVO {
    return new VendorCommissionConfigVO(props);
  }

  get type(): CommissionType { return this.value.type; }
  get percent(): CommissionPercentVO { return this.value.percent; }
  get fixedAmount(): CommissionAmountVO | undefined { return this.value.fixedAmount; }
  get applyOnShipping(): boolean { return this.value.applyOnShipping; }
  get applyOnTax(): boolean { return this.value.applyOnTax; }
  get effectiveFrom(): string { return this.value.effectiveFrom; }
  get effectiveTo(): string | undefined { return this.value.effectiveTo; }

  /** Compute total commission from an order amount. */
  calculateCommission(orderAmount: number): number {
    const percentPart = this.value.percent.applyTo(orderAmount);
    const fixedPart = this.value.fixedAmount?.amount ?? 0;
    return Math.round((percentPart + fixedPart) * 100) / 100;
  }

  isActive(at: Date = new Date()): boolean {
    const t = at.getTime();
    const from = Date.parse(this.value.effectiveFrom);
    const to = this.value.effectiveTo ? Date.parse(this.value.effectiveTo) : Number.POSITIVE_INFINITY;
    return t >= from && t < to;
  }

  isPercentage(): boolean {
    return this.value.type === VENDOR_COMMISSION_TYPE.PERCENTAGE;
  }

  isFixed(): boolean {
    return this.value.type === VENDOR_COMMISSION_TYPE.FIXED;
  }
}
