/**
 * CartValidator — schema-based request validation
 * @module cart-service/application/validators
 */
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors';

export interface CartValidationInput {
  readonly type?: string;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly currency?: string;
}

export class CartValidator {
  private static readonly ALLOWED_TYPES = ['guest', 'user', 'wishlist', 'saved', 'subscription'] as const;

  static validateCreate(input: CartValidationInput): void {
    if (input.type && !CartValidator.ALLOWED_TYPES.includes(input.type as never)) {
      throw new ApplicationValidationError(
        `Invalid cart type "${input.type}". Allowed: ${CartValidator.ALLOWED_TYPES.join(', ')}`,
        'type',
      );
    }
    if (input.type === 'guest' && input.userId) {
      throw new ApplicationValidationError(
        'Guest cart cannot have a userId',
        'userId',
      );
    }
    if (input.type === 'user' && !input.userId) {
      throw new ApplicationValidationError(
        'User cart requires userId',
        'userId',
      );
    }
    if (input.currency && input.currency.length !== 3) {
      throw new ApplicationValidationError(
        'Currency must be a 3-letter ISO 4217 code',
        'currency',
      );
    }
  }
}
