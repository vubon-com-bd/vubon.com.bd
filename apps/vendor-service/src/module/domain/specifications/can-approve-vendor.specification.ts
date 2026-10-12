/**
 * CanApproveVendorSpecification
 * @module vendor-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VendorVerificationEntity } from '../entities/vendor-verification.entity.js';

export interface CanApproveVendorContext {
  readonly vendor: VendorEntity;
  readonly verification?: VendorVerificationEntity;
  readonly hasFraudFlags?: boolean;
  readonly isDuplicate?: boolean;
}

export class CanApproveVendorSpecification extends Specification<CanApproveVendorContext> {
  isSatisfiedBy(ctx: CanApproveVendorContext): boolean {
    const { vendor, verification, hasFraudFlags, isDuplicate } = ctx;
    if (hasFraudFlags || isDuplicate) return false;
    if (!vendor.status.canTransitionTo('approved')) return false;
    if (verification && !verification.hasAllRequiredChecks()) return false;
    return true;
  }

  explain(ctx: CanApproveVendorContext): string | null {
    const { vendor, verification, hasFraudFlags, isDuplicate } = ctx;
    if (hasFraudFlags) return 'vendor has fraud flags';
    if (isDuplicate) return 'duplicate account detected';
    if (!vendor.status.canTransitionTo('approved')) {
      return `cannot approve from status "${vendor.status.value}"`;
    }
    if (verification && !verification.hasAllRequiredChecks()) {
      return 'verification checks incomplete';
    }
    return null;
  }
}
