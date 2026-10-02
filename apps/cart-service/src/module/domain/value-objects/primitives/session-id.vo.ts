/**
 * SessionId Value Object
 * @module cart-service/domain/value-objects/primitives
 *
 * SessionId is opaque (not necessarily UUID) — min 8 chars.
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 8;
const MAX_LENGTH = 128;

export class CartSessionIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CartSessionIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('SessionId cannot be empty', 'sessionId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(`SessionId min ${MIN_LENGTH} chars`, 'sessionId');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`SessionId max ${MAX_LENGTH} chars`, 'sessionId');
    }
    return new CartSessionIdVO(trimmed);
  }

  static reconstitute(raw: string): CartSessionIdVO {
    return new CartSessionIdVO(raw);
  }
}
