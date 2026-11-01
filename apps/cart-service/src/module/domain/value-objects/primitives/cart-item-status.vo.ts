/**
 * CartItemStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CartItemStatusValue = 'active' | 'out_of_stock' | 'unavailable' | 'removed' | 'saved';

const VALID_STATUSES: readonly string[] = [
  'active',
  'out_of_stock',
  'unavailable',
  'removed',
  'saved',
];

const VALID_TRANSITIONS: Readonly<Record<CartItemStatusValue, readonly CartItemStatusValue[]>> = {
  active: ['out_of_stock', 'unavailable', 'removed', 'saved'],
  out_of_stock: ['active', 'unavailable', 'removed'],
  unavailable: ['active', 'out_of_stock', 'removed'],
  removed: ['active'],
  saved: ['active', 'removed'],
};

export class CartItemStatusVO extends BaseStatusVO<CartItemStatusValue> {
  private constructor(value: CartItemStatusValue) {
    super(value);
  }

  static create(raw: string): CartItemStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CartItemStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new CartItemStatusVO(normalized as CartItemStatusValue);
  }

  static active(): CartItemStatusVO {
    return new CartItemStatusVO('active');
  }

  static reconstitute(raw: string): CartItemStatusVO {
    return new CartItemStatusVO(raw as CartItemStatusValue);
  }

  isActiveStatus(): boolean {
    return this.value === 'active';
  }
  isOutOfStock(): boolean {
    return this.value === 'out_of_stock';
  }
  isUnavailable(): boolean {
    return this.value === 'unavailable';
  }
  isRemoved(): boolean {
    return this.value === 'removed';
  }
  isSaved(): boolean {
    return this.value === 'saved';
  }

  isPurchasable(): boolean {
    return this.isActiveStatus();
  }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as CartItemStatusValue);
  }
}
