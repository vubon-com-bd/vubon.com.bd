/**
 * GuestCartStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type GuestCartStatusValue = 'active' | 'expired' | 'merged' | 'abandoned';

const VALID_STATUSES: readonly string[] = ['active', 'expired', 'merged', 'abandoned'];

const VALID_TRANSITIONS: Readonly<Record<GuestCartStatusValue, readonly GuestCartStatusValue[]>> = {
  active: ['expired', 'merged', 'abandoned'],
  expired: [],
  merged: [],
  abandoned: ['merged', 'expired'],
};

export class GuestCartStatusVO extends BaseStatusVO<GuestCartStatusValue> {
  private constructor(value: GuestCartStatusValue) {
    super(value);
  }

  static create(raw: string): GuestCartStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid GuestCartStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new GuestCartStatusVO(normalized as GuestCartStatusValue);
  }

  static active(): GuestCartStatusVO {
    return new GuestCartStatusVO('active');
  }

  static reconstitute(raw: string): GuestCartStatusVO {
    return new GuestCartStatusVO(raw as GuestCartStatusValue);
  }

  isActiveStatus(): boolean {
    return this.value === 'active';
  }
  isExpired(): boolean {
    return this.value === 'expired';
  }
  isMerged(): boolean {
    return this.value === 'merged';
  }
  isAbandoned(): boolean {
    return this.value === 'abandoned';
  }

  isFinal(): boolean {
    return this.isExpired() || this.isMerged();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as GuestCartStatusValue);
  }
}
