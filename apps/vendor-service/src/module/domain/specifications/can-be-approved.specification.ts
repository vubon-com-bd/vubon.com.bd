/**
 * CanBeApprovedSpecification
 * @module vendor-service/domain/specifications
 *
 * Business rules — vendor approval eligibility.
 *
 * Rules:
 *  - Vendor status must be pending
 *  - Required documents must be verified
 *  - Verification must be complete
 *  - Business info must be provided
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { VendorEntity } from '../entities/vendor.entity.js';

export interface ApprovalContext {
  readonly hasVerifiedIdentity: boolean;
  readonly hasVerifiedBusinessLicense: boolean;
  readonly hasVerifiedTaxId: boolean;
  readonly hasVerifiedBankAccount: boolean;
  readonly hasBusinessInfo: boolean;
  readonly hasAtLeastOneAddress: boolean;
  readonly requiresBusinessLicense?: boolean;
  readonly requiresTaxId?: boolean;
}

export interface ApprovalCandidate {
  readonly vendor: VendorEntity;
  readonly ctx: ApprovalContext;
}

export class CanBeApprovedSpecification extends Specification<ApprovalCandidate> {
  isSatisfiedBy(c: ApprovalCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: ApprovalCandidate): string | null {
    const { vendor, ctx } = c;

    if (vendor.isDeleted()) {
      return 'vendor is deleted';
    }
    if (vendor.isApproved()) {
      return 'vendor is already approved';
    }
    if (!vendor.isPending()) {
      return `vendor status "${vendor.status.value}" cannot be approved`;
    }

    if (!ctx.hasVerifiedIdentity) {
      return 'identity verification required';
    }
    if (!ctx.hasVerifiedBankAccount) {
      return 'verified bank account required';
    }
    if (!ctx.hasBusinessInfo) {
      return 'business info required';
    }
    if (!ctx.hasAtLeastOneAddress) {
      return 'at least one address required';
    }

    const requireLicense = ctx.requiresBusinessLicense ?? true;
    if (requireLicense && !ctx.hasVerifiedBusinessLicense) {
      return 'business license verification required';
    }

    const requireTaxId = ctx.requiresTaxId ?? true;
    if (requireTaxId && !ctx.hasVerifiedTaxId) {
      return 'tax ID verification required';
    }

    return null;
  }

  static strict(): CanBeApprovedSpecification {
    return new CanBeApprovedSpecification();
  }

  static relaxed(): CanBeApprovedSpecification {
    return new CanBeApprovedSpecification();
  }
}
