/**
 * CardToken Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Opaque gateway token, never the raw PAN
 * - 8-128 chars, alphanumeric + -_ (no spaces)
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 8;
const MAX_LENGTH = 128;
const TOKEN_PATTERN = /^[A-Za-z0-9_-]+$/;

export class CardTokenVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CardTokenVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CardToken cannot be empty', 'cardToken');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `CardToken must be ${MIN_LENGTH}-${MAX_LENGTH} chars`,
        'cardToken',
      );
    }
    if (!TOKEN_PATTERN.test(trimmed)) {
      throw new ValidationError(
        'CardToken must be alphanumeric + "-" or "_"',
        'cardToken',
      );
    }
    return new CardTokenVO(trimmed);
  }

  static reconstitute(raw: string): CardTokenVO {
    return new CardTokenVO(raw);
  }

  mask(): string {
    if (this.value.length <= 8) return '****';
    return `${this.value.slice(0, 4)}...${this.value.slice(-4)}`;
  }
}
