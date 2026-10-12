/**
 * CanSubmitKycSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { UserEntity } from '../entities/user.entity.js';
import type { UserKycEntity } from '../entities/user-kyc.entity.js';

export interface CanSubmitKycContext {
  readonly documentCount: number;
  readonly requiresEmailVerification?: boolean;
}

export interface CanSubmitKycCandidate {
  readonly user: UserEntity;
  readonly kyc?: UserKycEntity;
  readonly context: CanSubmitKycContext;
}

export class CanSubmitKycSpecification extends Specification<CanSubmitKycCandidate> {
  isSatisfiedBy(c: CanSubmitKycCandidate): boolean {
    const { user, kyc, context } = c;

    if (!user.isActive()) return false;
    if (context.requiresEmailVerification !== false && !user.emailVerified) return false;
    if (context.documentCount === 0) return false;

    if (kyc) {
      if (kyc.status.isVerified()) return false;
      if (kyc.status.isPending()) return false;
    }

    return true;
  }

  explain(c: CanSubmitKycCandidate): string | null {
    const { user, kyc, context } = c;

    if (!user.isActive()) {
      return `User status "${user.status.value}" is not active`;
    }
    if (context.requiresEmailVerification !== false && !user.emailVerified) {
      return 'Email verification required before KYC';
    }
    if (context.documentCount === 0) {
      return 'At least one document is required';
    }
    if (kyc?.status.isVerified()) {
      return 'KYC already verified';
    }
    if (kyc?.status.isPending()) {
      return 'KYC is already pending review';
    }
    return null;
  }

  static strict(): CanSubmitKycSpecification {
    return new CanSubmitKycSpecification();
  }
}
