/**
 * VoucherStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { VOUCHER_STATUS } from '@vubon/shared-constants/business/cart';
import { InvalidVoucherStatusError } from '../../errors/voucher.errors.js';

const ALLOWED = Object.values(VOUCHER_STATUS) as readonly string[];

export class VoucherStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): VoucherStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidVoucherStatusError(String(raw), ALLOWED);
    }
    return new VoucherStatusVO(raw);
  }

  static reconstitute(raw: string): VoucherStatusVO {
    return new VoucherStatusVO(raw);
  }

  isUsable(): boolean {
    return this.value === VOUCHER_STATUS.ACTIVE;
  }

  isRedeemed(): boolean {
    return this.value === VOUCHER_STATUS.REDEEMED;
  }

  isExpired(): boolean {
    return this.value === VOUCHER_STATUS.EXPIRED;
  }

  isCancelled(): boolean {
    return this.value === VOUCHER_STATUS.CANCELLED;
  }

  isScheduled(): boolean {
    return this.value === VOUCHER_STATUS.SCHEDULED;
  }
}
