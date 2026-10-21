/**
 * CardLast4 Value Object
 * @module payment-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - Exactly 4 digits
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const LAST4_PATTERN = /^\d{4}$/;

export class CardLast4VO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CardLast4VO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('CardLast4 cannot be empty', 'last4');
    }
    const trimmed = raw.trim();
    if (!LAST4_PATTERN.test(trimmed)) {
      throw new ValidationError('CardLast4 must be exactly 4 digits', 'last4');
    }
    return new CardLast4VO(trimmed);
  }

  static reconstitute(raw: string): CardLast4VO {
    return new CardLast4VO(raw);
  }

  masked(): string {
    return `**** **** **** ${this.value}`;
  }
}
