/**
 * SessionStatus Value Object
 * @module identity-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type SessionStatusValue = 'active' | 'expired' | 'revoked' | 'idle';

const VALID_STATUSES: readonly SessionStatusValue[] = ['active', 'expired', 'revoked', 'idle'];

const VALID_TRANSITIONS: Readonly<Record<SessionStatusValue, readonly SessionStatusValue[]>> = {
  active: ['idle', 'expired', 'revoked'],
  idle: ['active', 'expired', 'revoked'],
  expired: [],
  revoked: [],
};

export class SessionStatusVO extends BaseStatusVO<SessionStatusValue> {
  private constructor(value: SessionStatusValue) {
    super(value);
  }

  static create(raw: string): SessionStatusVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SessionStatus cannot be empty', 'sessionStatus');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized as SessionStatusValue)) {
      throw new ValidationError(
        `Invalid SessionStatus "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'sessionStatus',
      );
    }
    return new SessionStatusVO(normalized as SessionStatusValue);
  }

  static active(): SessionStatusVO { return new SessionStatusVO('active'); }
  static idle(): SessionStatusVO { return new SessionStatusVO('idle'); }
  static expired(): SessionStatusVO { return new SessionStatusVO('expired'); }
  static revoked(): SessionStatusVO { return new SessionStatusVO('revoked'); }

  static reconstitute(raw: string): SessionStatusVO {
    return new SessionStatusVO(raw as SessionStatusValue);
  }

  isActive(): boolean { return this.value === 'active'; }
  isIdle(): boolean { return this.value === 'idle'; }
  isExpired(): boolean { return this.value === 'expired'; }
  isRevoked(): boolean { return this.value === 'revoked'; }
  isFinal(): boolean { return this.isExpired() || this.isRevoked(); }
  isUsable(): boolean { return this.isActive() || this.isIdle(); }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as SessionStatusValue);
  }
}
