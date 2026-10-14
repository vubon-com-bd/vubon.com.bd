/**
 * CanRequestPayoutSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — payout request eligibility.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';
import type { VendorEntity } from '../entities/vendor.entity.js';
import type { VendorBankAccountEntity } from '../entities/vendor-bank-account.entity.js';

export interface PayoutContext {
  readonly requestedAmount: number;
  readonly availableBalance: number;
  readonly payoutsToday: number;
  readonly hasPendingPayout: boolean;
  readonly holdDaysRemaining: number;
}

export interface PayoutCandidate {
  readonly vendor: VendorEntity;
  readonly bankAccount: VendorBankAccountEntity;
  readonly ctx: PayoutContext;
}

export class CanRequestPayoutSpecification extends Specification<PayoutCandidate> {
  isSatisfiedBy(c: PayoutCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: PayoutCandidate): string | null {
    const { vendor, bankAccount, ctx } = c;

    // Vendor checks
    if (vendor.isDeleted()) return 'vendor is deleted';
    if (vendor.isBlocked()) return 'vendor is blocked';
    if (vendor.isSuspended()) return 'vendor is suspended';
    if (!vendor.isActive()) {
      return `vendor status "${vendor.status.value}" is not active`;
    }
    if (!vendor.isVerified()) {
      return 'vendor is not verified';
    }

    // Bank account checks
    if (!bankAccount.isVerified) {
      return 'bank account is not verified';
    }

    // Amount checks
    if (ctx.requestedAmount < VENDOR_PAYOUT.MIN_AMOUNT) {
      return `requested amount below minimum ${VENDOR_PAYOUT.MIN_AMOUNT}`;
    }
    if (ctx.requestedAmount > VENDOR_PAYOUT.MAX_AMOUNT) {
      return `requested amount exceeds maximum ${VENDOR_PAYOUT.MAX_AMOUNT}`;
    }
    if (ctx.requestedAmount > ctx.availableBalance) {
      return `requested amount exceeds available balance ${ctx.availableBalance}`;
    }

    // Hold + limit checks
    if (ctx.holdDaysRemaining > 0) {
      return `payout on hold for ${ctx.holdDaysRemaining} more day(s)`;
    }
    if (ctx.payoutsToday >= VENDOR_PAYOUT.MAX_PAYOUTS_PER_DAY) {
      return `daily payout limit reached`;
    }
    if (ctx.hasPendingPayout) {
      return 'another payout is already pending';
    }

    return null;
  }

  static strict(): CanRequestPayoutSpecification {
    return new CanRequestPayoutSpecification();
  }

  static relaxed(): CanRequestPayoutSpecification {
    return new CanRequestPayoutSpecification();
  }
}
