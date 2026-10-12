/**
 * CanRegisterSpecification
 * @module identity-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

export interface CanRegisterContext {
  readonly existingIdentifierCount: number;
  readonly maxIdentifiersPerUser?: number;
  readonly registrationEnabled?: boolean;
  readonly ipBlocked?: boolean;
  readonly ipRegistrationCount24h?: number;
  readonly maxRegistrationsPerIp24h?: number;
}

export interface CanRegisterCandidate {
  readonly identifier: string;
  readonly context: CanRegisterContext;
}

export class CanRegisterSpecification extends Specification<CanRegisterCandidate> {
  private static readonly DEFAULT_MAX_PER_IP = 5;

  isSatisfiedBy(c: CanRegisterCandidate): boolean {
    const ctx = c.context;

    if (ctx.registrationEnabled === false) return false;
    if (ctx.ipBlocked === true) return false;
    if (!c.identifier || c.identifier.trim().length === 0) return false;
    if (ctx.existingIdentifierCount > 0) return false;

    const maxPerIp = ctx.maxRegistrationsPerIp24h ?? CanRegisterSpecification.DEFAULT_MAX_PER_IP;
    const ipCount = ctx.ipRegistrationCount24h ?? 0;
    if (ipCount >= maxPerIp) return false;

    const maxIds = ctx.maxIdentifiersPerUser ?? 5;
    if (ctx.existingIdentifierCount >= maxIds) return false;

    return true;
  }

  explain(c: CanRegisterCandidate): string | null {
    const ctx = c.context;

    if (ctx.registrationEnabled === false) {
      return 'Registration is disabled';
    }
    if (ctx.ipBlocked === true) {
      return 'IP is blocked';
    }
    if (!c.identifier || c.identifier.trim().length === 0) {
      return 'Identifier cannot be empty';
    }
    if (ctx.existingIdentifierCount > 0) {
      return 'Identifier already registered';
    }
    const maxPerIp = ctx.maxRegistrationsPerIp24h ?? CanRegisterSpecification.DEFAULT_MAX_PER_IP;
    if ((ctx.ipRegistrationCount24h ?? 0) >= maxPerIp) {
      return `Too many registrations from this IP (${maxPerIp}/24h)`;
    }
    const maxIds = ctx.maxIdentifiersPerUser ?? 5;
    if (ctx.existingIdentifierCount >= maxIds) {
      return `Max identifiers per user reached (${maxIds})`;
    }
    return null;
  }

  static strict(): CanRegisterSpecification {
    return new CanRegisterSpecification();
  }
}
