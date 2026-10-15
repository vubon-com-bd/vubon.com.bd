/**
 * CartStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * State machine:
 *   active → abandoned → converted
 *   active → merged → cleared
 *   active → expired
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CartStatusValue =
  | 'active'
  | 'inactive'
  | 'abandoned'
  | 'converted'
  | 'expired'
  | 'merged'
  | 'cleared';

const VALID_STATUSES: readonly string[] = [
  'active',
  'inactive',
  'abandoned',
  'converted',
  'expired',
  'merged',
  'cleared',
];

const VALID_TRANSITIONS: Readonly<Record<CartStatusValue, readonly CartStatusValue[]>> = {
  active: ['inactive', 'abandoned', 'converted', 'expired', 'merged', 'cleared'],
  inactive: ['active', 'expired', 'cleared'],
  abandoned: ['active', 'converted', 'expired', 'cleared'],
  converted: ['cleared'],
  expired: ['cleared'],
  merged: ['cleared'],
  cleared: [],
};

export class CartStatusVO extends BaseStatusVO<CartStatusValue> {
  private constructor(value: CartStatusValue) {
    super(value);
  }

  static create(raw: string): CartStatusVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CartStatus must be a string', 'status');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CartStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new CartStatusVO(normalized as CartStatusValue);
  }

  static active(): CartStatusVO {
    return new CartStatusVO('active');
  }

  static abandoned(): CartStatusVO {
    return new CartStatusVO('abandoned');
  }

  static converted(): CartStatusVO {
    return new CartStatusVO('converted');
  }

  static cleared(): CartStatusVO {
    return new CartStatusVO('cleared');
  }

  static reconstitute(raw: string): CartStatusVO {
    return new CartStatusVO(raw as CartStatusValue);
  }

  // ═══ Predicates ═══
  isActiveStatus(): boolean {
    return this.value === 'active';
  }
  isInactive(): boolean {
    return this.value === 'inactive';
  }
  isAbandoned(): boolean {
    return this.value === 'abandoned';
  }
  isConverted(): boolean {
    return this.value === 'converted';
  }
  isExpired(): boolean {
    return this.value === 'expired';
  }
  isMerged(): boolean {
    return this.value === 'merged';
  }
  isCleared(): boolean {
    return this.value === 'cleared';
  }

  isFinal(): boolean {
    return this.isConverted() || this.isExpired() || this.isMerged() || this.isCleared();
  }

  isModifiable(): boolean {
    return this.isActiveStatus() || this.isInactive() || this.isAbandoned();
  }

  // ═══ State Machine ═══
  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as CartStatusValue);
  }
}
