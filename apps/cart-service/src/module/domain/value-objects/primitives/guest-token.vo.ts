/**
 * GuestToken Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - 16-128 characters
 * - URL-safe
 * - TTL: 7 days (604800s)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 16;
const MAX_LENGTH = 128;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]+$/;

export class GuestTokenVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): GuestTokenVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('GuestToken must be a string', 'token');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `GuestToken must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'token',
      );
    }
    if (!TOKEN_PATTERN.test(trimmed)) {
      throw new ValidationError('GuestToken contains invalid characters', 'token');
    }
    return new GuestTokenVO(trimmed);
  }

  static reconstitute(raw: string): GuestTokenVO {
    return new GuestTokenVO(raw);
  }

  get length(): number {
    return this.value.length;
  }

  isStrong(): boolean {
    return this.value.length >= 32;
  }
}
