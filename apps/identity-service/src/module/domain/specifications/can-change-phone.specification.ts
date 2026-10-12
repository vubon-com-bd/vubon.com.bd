/**
 * CanChangePhoneSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface CanChangePhoneContext {
  readonly isNewPhoneVerified: boolean;
  readonly userActive: boolean;
  readonly cooldownPassed: boolean;
  readonly currentPhoneVerified: boolean;
}

export interface CanChangePhoneCandidate {
  readonly userId: string;
  readonly currentPhone?: string;
  readonly newPhone: string;
  readonly context: CanChangePhoneContext;
}

export class CanChangePhoneSpecification extends Specification<CanChangePhoneCandidate> {
  isSatisfiedBy(c: CanChangePhoneCandidate): boolean {
    if (!c.context.userActive) return false;
    if (!c.context.cooldownPassed) return false;
    if (c.currentPhone && c.currentPhone === c.newPhone) return false;
    if (!c.context.isNewPhoneVerified) return false;
    return true;
  }

  explain(c: CanChangePhoneCandidate): string | null {
    if (!c.context.userActive) return 'user is not active';
    if (!c.context.cooldownPassed) return 'phone change cooldown active';
    if (c.currentPhone === c.newPhone) return 'new phone is same as current';
    if (!c.context.isNewPhoneVerified) return 'new phone must be verified';
    return null;
  }

  static strict(): CanChangePhoneSpecification {
    return new CanChangePhoneSpecification();
  }
}
