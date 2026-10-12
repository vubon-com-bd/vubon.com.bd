/**
 * CanRequestPayoutSpecification
 * @module vendor-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';

export interface CanRequestPayoutContext {
  readonly vendor: VendorEntity;
  readonly amount: number;
  readonly availableBalance: number;
  readonly hasPendingPayout: boolean;
  readonly bankAccountVerified: boolean;
  readonly payoutsToday: number;
}

export class CanRequestPayoutSpecification extends Specification<CanRequestPayoutContext> {
  isSatisfiedBy(ctx: CanRequestPayoutContext): boolean {
    const {
      vendor, amount, availableBalance, hasPendingPayout,
      bankAccountVerified, payoutsToday,
    } = ctx;
    if (!vendor.isOperational()) return false;
    if (!bankAccountVerified) return false;
    if (hasPendingPayout) return false;
    if (amount > availableBalance) return false;
    if (amount < VENDOR_PAYOUT.MIN_AMOUNT) return false;
    if (amount > VENDOR_PAYOUT.MAX_AMOUNT) return false;
    if (payoutsToday >= VENDOR_PAYOUT.MAX_PAYOUTS_PER_DAY) return false;
    return true;
  }

  explain(ctx: CanRequestPayoutContext): string | null {
    const {
      vendor, amount, availableBalance, hasPendingPayout,
      bankAccountVerified, payoutsToday,
    } = ctx;
    if (!vendor.isOperational()) return 'vendor not operational';
    if (!bankAccountVerified) return 'bank account not verified';
    if (hasPendingPayout) return 'vendor has a pending payout';
    if (amount > availableBalance) return `requested ${amount} exceeds available ${availableBalance}`;
    if (amount < VENDOR_PAYOUT.MIN_AMOUNT) return `below minimum ${VENDOR_PAYOUT.MIN_AMOUNT}`;
    if (amount > VENDOR_PAYOUT.MAX_AMOUNT) return `above maximum ${VENDOR_PAYOUT.MAX_AMOUNT}`;
    if (payoutsToday >= VENDOR_PAYOUT.MAX_PAYOUTS_PER_DAY) {
      return `daily limit reached (${payoutsToday}/${VENDOR_PAYOUT.MAX_PAYOUTS_PER_DAY})`;
    }
    return null;
  }
}
