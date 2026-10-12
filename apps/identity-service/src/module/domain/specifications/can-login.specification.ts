/**
 * CanLoginSpecification
 * @module identity-service/domain/specifications
 *
 * Determines if an Auth can log in given context.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { AuthEntity } from '../entities/auth.entity.js';

export interface CanLoginContext {
  readonly nowMs?: number;
  readonly requiresEmailVerification?: boolean;
  readonly requiresPhoneVerification?: boolean;
  readonly requireMfaVerified?: boolean;
  readonly mfaVerified?: boolean;
}

export interface CanLoginCandidate {
  readonly auth: AuthEntity;
  readonly context?: CanLoginContext;
}

export class CanLoginSpecification extends Specification<CanLoginCandidate> {
  isSatisfiedBy(c: CanLoginCandidate): boolean {
    const { auth, context } = c;
    const nowMs = context?.nowMs ?? Date.now();

    if (!auth.isActive()) return false;
    if (auth.isLockedNow(nowMs)) return false;
    if (auth.isFinal()) return false;

    if (context?.requiresEmailVerification && !auth.isEmailVerified) return false;
    if (context?.requiresPhoneVerification && !auth.isPhoneVerified) return false;
    if (context?.requireMfaVerified && auth.isMfaEnabled && !context.mfaVerified) return false;

    return true;
  }

  explain(c: CanLoginCandidate): string | null {
    const { auth, context } = c;
    const nowMs = context?.nowMs ?? Date.now();

    if (!auth.isActive()) {
      return `Auth status "${auth.status.value}" is not active`;
    }
    if (auth.isLockedNow(nowMs)) {
      return `Auth is locked until ${auth.lockedUntil}`;
    }
    if (auth.isFinal()) {
      return `Auth status "${auth.status.value}" is terminal`;
    }
    if (context?.requiresEmailVerification && !auth.isEmailVerified) {
      return 'Email verification required';
    }
    if (context?.requiresPhoneVerification && !auth.isPhoneVerified) {
      return 'Phone verification required';
    }
    if (context?.requireMfaVerified && auth.isMfaEnabled && !context.mfaVerified) {
      return 'MFA verification required';
    }
    return null;
  }

  static strict(): CanLoginSpecification {
    return new CanLoginSpecification();
  }
}
