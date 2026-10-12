/**
 * PayoutStatus Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { VENDOR_PAYOUT_STATUS } from '@vubon/shared-constants/business';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(VENDOR_PAYOUT_STATUS) as readonly string[];

export class PayoutStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): PayoutStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(`Invalid payout status "${raw}". Allowed: ${ALLOWED.join(', ')}`, 'status');
    }
    return new PayoutStatusVO(raw);
  }

  static pending(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.PENDING); }
  static processing(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.PROCESSING); }
  static approved(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.APPROVED); }
  static paid(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.PAID); }
  static failed(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.FAILED); }
  static rejected(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.REJECTED); }
  static cancelled(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.CANCELLED); }
  static onHold(): PayoutStatusVO { return new PayoutStatusVO(VENDOR_PAYOUT_STATUS.ON_HOLD); }

  static reconstitute(raw: string): PayoutStatusVO { return new PayoutStatusVO(raw); }

  isPending(): boolean { return this.value === VENDOR_PAYOUT_STATUS.PENDING; }
  isProcessing(): boolean { return this.value === VENDOR_PAYOUT_STATUS.PROCESSING; }
  isApproved(): boolean { return this.value === VENDOR_PAYOUT_STATUS.APPROVED; }
  isPaid(): boolean { return this.value === VENDOR_PAYOUT_STATUS.PAID; }
  isFailed(): boolean { return this.value === VENDOR_PAYOUT_STATUS.FAILED; }
  isRejected(): boolean { return this.value === VENDOR_PAYOUT_STATUS.REJECTED; }
  isCancelled(): boolean { return this.value === VENDOR_PAYOUT_STATUS.CANCELLED; }
  isOnHold(): boolean { return this.value === VENDOR_PAYOUT_STATUS.ON_HOLD; }

  isSuccessful(): boolean { return this.isPaid(); }
  isFinal(): boolean {
    return [VENDOR_PAYOUT_STATUS.PAID, VENDOR_PAYOUT_STATUS.FAILED, VENDOR_PAYOUT_STATUS.REJECTED, VENDOR_PAYOUT_STATUS.CANCELLED].includes(this.value as never);
  }

  canTransitionTo(target: string): boolean {
    const t: Record<string, readonly string[]> = {
      [VENDOR_PAYOUT_STATUS.PENDING]: [VENDOR_PAYOUT_STATUS.PROCESSING, VENDOR_PAYOUT_STATUS.APPROVED, VENDOR_PAYOUT_STATUS.REJECTED, VENDOR_PAYOUT_STATUS.CANCELLED, VENDOR_PAYOUT_STATUS.ON_HOLD],
      [VENDOR_PAYOUT_STATUS.PROCESSING]: [VENDOR_PAYOUT_STATUS.APPROVED, VENDOR_PAYOUT_STATUS.PAID, VENDOR_PAYOUT_STATUS.FAILED, VENDOR_PAYOUT_STATUS.ON_HOLD],
      [VENDOR_PAYOUT_STATUS.APPROVED]: [VENDOR_PAYOUT_STATUS.PROCESSING, VENDOR_PAYOUT_STATUS.PAID, VENDOR_PAYOUT_STATUS.FAILED, VENDOR_PAYOUT_STATUS.CANCELLED],
      [VENDOR_PAYOUT_STATUS.ON_HOLD]: [VENDOR_PAYOUT_STATUS.PENDING, VENDOR_PAYOUT_STATUS.PROCESSING, VENDOR_PAYOUT_STATUS.CANCELLED],
      [VENDOR_PAYOUT_STATUS.FAILED]: [VENDOR_PAYOUT_STATUS.PENDING],
      [VENDOR_PAYOUT_STATUS.PAID]: [],
      [VENDOR_PAYOUT_STATUS.REJECTED]: [],
      [VENDOR_PAYOUT_STATUS.CANCELLED]: [],
    };
    return (t[this.value] ?? []).includes(target);
  }
}
