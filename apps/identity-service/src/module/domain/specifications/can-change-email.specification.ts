/**
 * CanChangeEmailSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface CanChangeEmailContext {
  readonly isNewEmailVerified: boolean;
  readonly userActive: boolean;
  readonly cooldownPassed: boolean;
  readonly currentEmailVerified: boolean;
}

export interface CanChangeEmailCandidate {
  readonly userId: string;
  readonly currentEmail: string;
  readonly newEmail: string;
  readonly context: CanChangeEmailContext;
}

export class CanChangeEmailSpecification extends Specification<CanChangeEmailCandidate> {
  isSatisfiedBy(c: CanChangeEmailCandidate): boolean {
    if (!c.context.userActive) return false;
    if (!c.context.cooldownPassed) return false;
    if (c.currentEmail.toLowerCase() === c.newEmail.toLowerCase()) return false;
    if (!c.context.isNewEmailVerified) return false;
    return true;
  }

  explain(c: CanChangeEmailCandidate): string | null {
    if (!c.context.userActive) return 'user is not active';
    if (!c.context.cooldownPassed) return 'email change cooldown active';
    if (c.currentEmail.toLowerCase() === c.newEmail.toLowerCase()) {
      return 'new email is same as current';
    }
    if (!c.context.isNewEmailVerified) return 'new email must be verified';
    return null;
  }

  static strict(): CanChangeEmailSpecification {
    return new CanChangeEmailSpecification();
  }
}
