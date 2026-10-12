/**
 * CanDisableMfaSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { AuthEntity } from '../entities/auth.entity.js';

export interface CanDisableMfaContext {
  readonly currentPasswordProvided?: boolean;
  readonly mfaVerifiedRecently?: boolean;
  readonly adminOverride?: boolean;
}

export interface CanDisableMfaCandidate {
  readonly auth: AuthEntity;
  readonly context?: CanDisableMfaContext;
}

export class CanDisableMfaSpecification extends Specification<CanDisableMfaCandidate> {
  isSatisfiedBy(c: CanDisableMfaCandidate): boolean {
    const { auth, context } = c;

    if (!auth.isMfaEnabled) return false;
    if (context?.adminOverride) return true;

    // Must prove identity: password OR recent MFA verification
    if (!context?.currentPasswordProvided && !context?.mfaVerifiedRecently) {
      return false;
    }
    return true;
  }

  explain(c: CanDisableMfaCandidate): string | null {
    const { auth, context } = c;

    if (!auth.isMfaEnabled) {
      return 'MFA is not currently enabled';
    }
    if (context?.adminOverride) return null;
    if (!context?.currentPasswordProvided && !context?.mfaVerifiedRecently) {
      return 'Current password or recent MFA verification required to disable MFA';
    }
    return null;
  }

  static strict(): CanDisableMfaSpecification {
    return new CanDisableMfaSpecification();
  }
}
