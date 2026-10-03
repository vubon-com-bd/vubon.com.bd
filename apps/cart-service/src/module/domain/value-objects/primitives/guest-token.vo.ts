/**
 * GuestToken Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Cryptographically random string, base64-url safe
 * - Min 16 chars, Max 128 chars
 * - Never log or expose in URLs beyond header
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';
import { GUEST_TOKEN_LIMIT } from '@vubon/shared-constants/business/cart';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const TOKEN_PATTERN = /^[A-Za-z0-9_-]+$/;

export class GuestTokenVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): GuestTokenVO {
    if (typeof raw !== 'string' || raw.length === 0) {
      throw new ValidationError('GuestToken cannot be empty', 'token');
    }
    if (raw.length < GUEST_TOKEN_LIMIT.MIN_LENGTH) {
      throw new ValidationError(
        `GuestToken must be at least ${GUEST_TOKEN_LIMIT.MIN_LENGTH} chars`,
        'token',
      );
    }
    if (raw.length > GUEST_TOKEN_LIMIT.MAX_LENGTH) {
      throw new ValidationError(
        `GuestToken cannot exceed ${GUEST_TOKEN_LIMIT.MAX_LENGTH} chars`,
        'token',
      );
    }
    if (!TOKEN_PATTERN.test(raw)) {
      throw new ValidationError(
        'GuestToken contains invalid characters (base64-url safe only)',
        'token',
      );
    }
    return new GuestTokenVO(raw);
  }

  static reconstitute(raw: string): GuestTokenVO {
    return new GuestTokenVO(raw);
  }

  /** For safe logging — only shows last 4 chars */
  mask(): string {
    if (this.value.length <= 8) return '****';
    return `${'*'.repeat(Math.min(12, this.value.length - 4))}${this.value.slice(-4)}`;
  }
}
