/**
 * CanEnableMfaSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { AuthEntity } from '../entities/auth.entity.js';

export interface CanEnableMfaContext {
  readonly method: string;
  readonly secretProvisioned?: boolean;
  readonly ipTrusted?: boolean;
}

export interface CanEnableMfaCandidate {
  readonly auth: AuthEntity;
  readonly context: CanEnableMfaContext;
}

export class CanEnableMfaSpecification extends Specification<CanEnableMfaCandidate> {
  isSatisfiedBy(c: CanEnableMfaCandidate): boolean {
    const { auth, context } = c;

    if (!auth.isActive()) return false;
    if (auth.isMfaEnabled) return false;
    if (!auth.isEmailVerified && !auth.isPhoneVerified) return false;

    const strongMethods = ['totp', 'webauthn'];
    if (strongMethods.includes(context.method) && !context.secretProvisioned) {
      return false;
    }

    return true;
  }

  explain(c: CanEnableMfaCandidate): string | null {
    const { auth, context } = c;

    if (!auth.isActive()) {
      return `Auth status "${auth.status.value}" is not active`;
    }
    if (auth.isMfaEnabled) {
      return 'MFA is already enabled';
    }
    if (!auth.isEmailVerified && !auth.isPhoneVerified) {
      return 'Email or phone verification required before enabling MFA';
    }
    const strongMethods = ['totp', 'webauthn'];
    if (strongMethods.includes(context.method) && !context.secretProvisioned) {
      return `Method "${context.method}" requires a provisioned secret`;
    }
    return null;
  }

  static strict(): CanEnableMfaSpecification {
    return new CanEnableMfaSpecification();
  }
}
