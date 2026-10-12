/**
 * VendorReturnPolicyConfigVO — full return policy
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ReturnTypeVO } from '../primitives/return-type.vo.js';
import { ReturnWindowDaysVO } from '../primitives/return-window-days.vo.js';
import { ReturnPolicyNoteVO } from '../primitives/return-policy-note.vo.js';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants/business';

export interface VendorReturnPolicyConfigVOProps {
  readonly type: ReturnTypeVO;
  readonly window: ReturnWindowDaysVO;
  readonly freeReturn: boolean;
  readonly restockFeePercent: number;
  readonly requireReason: boolean;
  readonly requireImages: boolean;
  readonly maxImages: number;
  readonly autoApprove: boolean;
  readonly approvalSlaHours: number;
  readonly exclusions?: readonly string[];
  readonly note?: ReturnPolicyNoteVO;
}

export class VendorReturnPolicyConfigVO extends BaseVO<VendorReturnPolicyConfigVOProps> {
  private constructor(props: VendorReturnPolicyConfigVOProps) {
    super(props);
  }

  static create(props: VendorReturnPolicyConfigVOProps): VendorReturnPolicyConfigVO {
    if (!(props.type instanceof ReturnTypeVO)) {
      throw new ValidationError('Return policy requires ReturnTypeVO', 'type');
    }
    if (!(props.window instanceof ReturnWindowDaysVO)) {
      throw new ValidationError('Return policy requires ReturnWindowDaysVO', 'window');
    }
    if (props.restockFeePercent < 0 || props.restockFeePercent > 100) {
      throw new ValidationError('Restock fee percent must be between 0 and 100', 'restockFeePercent');
    }
    if (!Number.isInteger(props.maxImages) || props.maxImages < 0 || props.maxImages > 10) {
      throw new ValidationError('Max images must be between 0 and 10', 'maxImages');
    }
    if (!Number.isInteger(props.approvalSlaHours) || props.approvalSlaHours <= 0) {
      throw new ValidationError('Approval SLA hours must be a positive integer', 'approvalSlaHours');
    }
    // Business rule: no-return policy cannot have a positive window
    if (!props.type.allowsReturn() && props.window.days > 0) {
      throw new ValidationError(
        'Return type NO_RETURN cannot have a positive return window',
        'window',
      );
    }
    if (props.note !== undefined && !(props.note instanceof ReturnPolicyNoteVO)) {
      throw new ValidationError('Return policy note must be ReturnPolicyNoteVO', 'note');
    }
    return new VendorReturnPolicyConfigVO(props);
  }

  static reconstitute(props: VendorReturnPolicyConfigVOProps): VendorReturnPolicyConfigVO {
    return new VendorReturnPolicyConfigVO(props);
  }

  static defaults(): VendorReturnPolicyConfigVO {
    return VendorReturnPolicyConfigVO.create({
      type: ReturnTypeVO.reconstitute('full_return'),
      window: ReturnWindowDaysVO.default(),
      freeReturn: VENDOR_RETURN_POLICY.FREE_RETURN,
      restockFeePercent: VENDOR_RETURN_POLICY.RESTOCK_FEE_PERCENT,
      requireReason: VENDOR_RETURN_POLICY.REQUIRE_REASON,
      requireImages: VENDOR_RETURN_POLICY.REQUIRE_IMAGES,
      maxImages: VENDOR_RETURN_POLICY.MAX_IMAGES,
      autoApprove: VENDOR_RETURN_POLICY.AUTO_APPROVE,
      approvalSlaHours: VENDOR_RETURN_POLICY.APPROVAL_SLA_HOURS,
    });
  }

  get type(): ReturnTypeVO { return this.value.type; }
  get window(): ReturnWindowDaysVO { return this.value.window; }
  get freeReturn(): boolean { return this.value.freeReturn; }
  get restockFeePercent(): number { return this.value.restockFeePercent; }
  get autoApprove(): boolean { return this.value.autoApprove; }

  allowsReturn(): boolean {
    return this.value.type.allowsReturn();
  }

  allowsRefund(): boolean {
    return this.value.type.allowsRefund();
  }

  isExchangeOnly(): boolean {
    return this.value.type.isExchangeOnly();
  }

  /** Compute restock fee for a refund amount. */
  calculateRestockFee(refundAmount: number): number {
    if (!this.value.freeReturn) return 0;
    return Math.round(refundAmount * (this.value.restockFeePercent / 100) * 100) / 100;
  }

  canReturnAt(deliveredAt: Date, now: Date = new Date()): boolean {
    return this.value.window.isWithinWindow(deliveredAt, now);
  }

  /** Compute the last returnable date for a delivery. */
  getReturnDeadline(deliveredAt: Date): Date {
    return this.value.window.calculateDeadline(deliveredAt);
  }

  isGenerousPolicy(): boolean {
    return this.value.window.isGenerous() && this.value.freeReturn;
  }

  isStrictPolicy(): boolean {
    return this.value.window.isShort() || !this.value.freeReturn;
  }
}
