/**
 * CartType Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type CartTypeValue = 'guest' | 'user' | 'wishlist' | 'saved' | 'subscription';

const VALID_TYPES: readonly string[] = ['guest', 'user', 'wishlist', 'saved', 'subscription'];

export class CartTypeVO extends BaseVO<CartTypeValue> {
  private constructor(value: CartTypeValue) {
    super(value);
  }

  static create(raw: string): CartTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('CartType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid CartType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new CartTypeVO(normalized as CartTypeValue);
  }

  static guest(): CartTypeVO {
    return new CartTypeVO('guest');
  }

  static user(): CartTypeVO {
    return new CartTypeVO('user');
  }

  static reconstitute(raw: string): CartTypeVO {
    return new CartTypeVO(raw as CartTypeValue);
  }

  isGuest(): boolean {
    return this.value === 'guest';
  }

  isUser(): boolean {
    return this.value === 'user';
  }

  isWishlist(): boolean {
    return this.value === 'wishlist';
  }

  isSaved(): boolean {
    return this.value === 'saved';
  }

  isSubscription(): boolean {
    return this.value === 'subscription';
  }

  requiresUser(): boolean {
    return !this.isGuest();
  }
}
