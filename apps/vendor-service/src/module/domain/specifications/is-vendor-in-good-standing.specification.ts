/**
 * IsVendorInGoodStandingSpecification
 * @module vendor-service/domain/specifications
 *
 * Composite: operational + verified + rating OK + no suspensions + no overdue.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

export interface IsVendorInGoodStandingContext {
  readonly vendor: VendorEntity;
  readonly hasOverdueInvoice: boolean;
  readonly openDisputes: number;
}

export class IsVendorInGoodStandingSpecification extends Specification<IsVendorInGoodStandingContext> {
  isSatisfiedBy(ctx: IsVendorInGoodStandingContext): boolean {
    const { vendor, hasOverdueInvoice, openDisputes } = ctx;
    if (!vendor.isOperational()) return false;
    if (!vendor.isVerified) return false;
    if (vendor.rating.value > 0 && vendor.rating.value < VENDOR_RATING.AUTO_FLAG_BELOW) return false;
    if (hasOverdueInvoice) return false;
    if (openDisputes > 0) return false;
    return true;
  }

  explain(ctx: IsVendorInGoodStandingContext): string | null {
    const { vendor, hasOverdueInvoice, openDisputes } = ctx;
    if (!vendor.isOperational()) return `status "${vendor.status.value}" not operational`;
    if (!vendor.isVerified) return 'vendor not verified';
    if (vendor.rating.value > 0 && vendor.rating.value < VENDOR_RATING.AUTO_FLAG_BELOW) {
      return `rating ${vendor.rating.value} below threshold`;
    }
    if (hasOverdueInvoice) return 'has overdue invoice';
    if (openDisputes > 0) return `${openDisputes} open disputes`;
    return null;
  }
}
