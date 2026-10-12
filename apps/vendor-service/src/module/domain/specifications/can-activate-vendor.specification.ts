/**
 * CanActivateVendorSpecification
 * @module vendor-service/domain/specifications
 *
 * Approval + verification + required config must all be present.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VendorVerificationEntity } from '../entities/vendor-verification.entity.js';

export interface CanActivateVendorContext {
  readonly vendor: VendorEntity;
  readonly verification?: VendorVerificationEntity;
}

export class CanActivateVendorSpecification extends Specification<CanActivateVendorContext> {
  isSatisfiedBy(ctx: CanActivateVendorContext): boolean {
    const { vendor, verification } = ctx;
    if (!vendor.isApproved()) return false;
    if (!vendor.location) return false;
    if (!vendor.contact?.isFullyComplete()) return false;
    if (!vendor.payoutConfig) return false;
    if (!vendor.commission) return false;
    if (verification && !verification.hasAllRequiredChecks()) return false;
    return true;
  }

  explain(ctx: CanActivateVendorContext): string | null {
    const { vendor, verification } = ctx;
    if (!vendor.isApproved()) return `vendor not approved (status: ${vendor.status.value})`;
    if (!vendor.location) return 'vendor has no location';
    if (!vendor.contact?.isFullyComplete()) return 'contact info incomplete';
    if (!vendor.payoutConfig) return 'payout config missing';
    if (!vendor.commission) return 'commission config missing';
    if (verification && !verification.hasAllRequiredChecks()) {
      return 'verification checks incomplete';
    }
    return null;
  }
}
