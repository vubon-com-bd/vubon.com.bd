/**
 * CanVerifyKycSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { UserKycEntity } from '../entities/user-kyc.entity.js';

export interface CanVerifyKycContext {
  readonly reviewerRole: string;
  readonly reviewerHasPermission: boolean;
  readonly isSameAsSubmitter?: boolean;
}

export interface CanVerifyKycCandidate {
  readonly kyc: UserKycEntity;
  readonly context: CanVerifyKycContext;
}

export class CanVerifyKycSpecification extends Specification<CanVerifyKycCandidate> {
  private static readonly ALLOWED_ROLES = ['super_admin', 'admin', 'moderator', 'support_agent'];

  isSatisfiedBy(c: CanVerifyKycCandidate): boolean {
    const { kyc, context } = c;

    if (!CanVerifyKycSpecification.ALLOWED_ROLES.includes(context.reviewerRole)) return false;
    if (!context.reviewerHasPermission) return false;
    if (context.isSameAsSubmitter) return false;

    if (!kyc.status.isPending() && !kyc.status.isResubmitted()) return false;
    if (kyc.documents.length === 0) return false;

    return true;
  }

  explain(c: CanVerifyKycCandidate): string | null {
    const { kyc, context } = c;

    if (!CanVerifyKycSpecification.ALLOWED_ROLES.includes(context.reviewerRole)) {
      return `Role "${context.reviewerRole}" cannot verify KYC`;
    }
    if (!context.reviewerHasPermission) {
      return 'Reviewer does not have KYC verification permission';
    }
    if (context.isSameAsSubmitter) {
      return 'Cannot verify own KYC submission';
    }
    if (!kyc.status.isPending() && !kyc.status.isResubmitted()) {
      return `KYC status "${kyc.status.value}" is not verifiable`;
    }
    if (kyc.documents.length === 0) {
      return 'KYC has no documents';
    }
    return null;
  }

  static strict(): CanVerifyKycSpecification {
    return new CanVerifyKycSpecification();
  }
}
