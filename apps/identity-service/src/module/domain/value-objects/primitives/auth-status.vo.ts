/**
 * AuthStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * State machine:
 *   pending → active → locked → active
 *   pending → unverified → active
 *   active → inactive → active
 *   any → revoked (terminal)
 *   any → expired (terminal)
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { AUTH_STATUS } from '@vubon/shared-constants/auth';
import { InvalidAuthStatusError } from '../../errors/auth.errors.js';

export type AuthStatusValue =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'locked'
  | 'expired'
  | 'revoked'
  | 'unverified';

const VALID_STATUSES: readonly string[] = Object.values(AUTH_STATUS);

const VALID_TRANSITIONS: Readonly<Record<AuthStatusValue, readonly AuthStatusValue[]>> = {
  pending: ['active', 'unverified', 'revoked', 'expired'],
  unverified: ['active', 'revoked', 'expired'],
  active: ['inactive', 'locked', 'revoked', 'expired'],
  inactive: ['active', 'revoked', 'expired'],
  locked: ['active', 'revoked', 'expired'],
  revoked: [],
  expired: [],
};

export class AuthStatusVO extends BaseStatusVO<AuthStatusValue> {
  private constructor(value: AuthStatusValue) {
    super(value);
  }

  static create(raw: string): AuthStatusVO {
    if (typeof raw !== 'string') {
      throw new InvalidAuthStatusError(String(raw), VALID_STATUSES);
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new InvalidAuthStatusError(normalized, VALID_STATUSES);
    }
    return new AuthStatusVO(normalized as AuthStatusValue);
  }

  static pending(): AuthStatusVO { return new AuthStatusVO('pending'); }
  static active(): AuthStatusVO { return new AuthStatusVO('active'); }
  static inactive(): AuthStatusVO { return new AuthStatusVO('inactive'); }
  static locked(): AuthStatusVO { return new AuthStatusVO('locked'); }
  static unverified(): AuthStatusVO { return new AuthStatusVO('unverified'); }
  static expired(): AuthStatusVO { return new AuthStatusVO('expired'); }
  static revoked(): AuthStatusVO { return new AuthStatusVO('revoked'); }

  static reconstitute(raw: string): AuthStatusVO {
    return new AuthStatusVO(raw as AuthStatusValue);
  }

  // Predicates
  isPending(): boolean { return this.value === 'pending'; }
  isActive(): boolean { return this.value === 'active'; }
  isInactive(): boolean { return this.value === 'inactive'; }
  isLocked(): boolean { return this.value === 'locked'; }
  isUnverified(): boolean { return this.value === 'unverified'; }
  isExpired(): boolean { return this.value === 'expired'; }
  isRevoked(): boolean { return this.value === 'revoked'; }

  isFinal(): boolean {
    return this.isRevoked() || this.isExpired();
  }

  isUsable(): boolean {
    return this.isActive() || this.isInactive();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as AuthStatusValue);
  }
}
