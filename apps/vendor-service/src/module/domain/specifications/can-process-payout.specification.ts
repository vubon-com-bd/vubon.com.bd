/**
 * CanProcessPayoutSpecification
 * @module vendor-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VendorPayoutEntity } from '../entities/vendor-payout.entity.js';
import { VENDOR_PAYOUT } from '@vubon/shared-constants/business';

export interface CanProcessPayoutContext {
  readonly vendor: VendorEntity;
  readonly payout: VendorPayoutEntity;
  readonly bankAccountVerified: boolean;
}

export class CanProcessPayoutSpecification extends Specification<CanProcessPayoutContext> {
  isSatisfiedBy(ctx: CanProcessPayoutContext): boolean {
    const { vendor, payout, bankAccountVerified } = ctx;
    if (!vendor.isOperational()) return false;
    if (!bankAccountVerified) return false;
    if (!payout.status.isPending() && !payout.status.isApproved()) return false;
    if (payout.amount.amount < VENDOR_PAYOUT.MIN_AMOUNT) return false;
    if (payout.amount.amount > VENDOR_PAYOUT.MAX_AMOUNT) return false;
    return true;
  }

  explain(ctx: CanProcessPayoutContext): string | null {
    const { vendor, payout, bankAccountVerified } = ctx;
    if (!vendor.isOperational()) return `vendor not operational (status: ${vendor.status.value})`;
    if (!bankAccountVerified) return 'bank account not verified';
    if (payout.status.isPaid()) return 'payout already paid';
    if (payout.status.isFailed()) return 'payout previously failed';
    if (payout.amount.amount < VENDOR_PAYOUT.MIN_AMOUNT) {
      return `amount ${payout.amount.amount} below minimum ${VENDOR_PAYOUT.MIN_AMOUNT}`;
    }
    if (payout.amount.amount > VENDOR_PAYOUT.MAX_AMOUNT) {
      return `amount ${payout.amount.amount} above maximum ${VENDOR_PAYOUT.MAX_AMOUNT}`;
    }
    return null;
  }
}
