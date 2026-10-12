/**
 * AuthId Value Object
 * @module identity-service/domain/value-objects/primitives
 *
 * Business Rule:
 * - UUID v4 format
 * - Immutable
 * - DB থেকে reconstitute করার সময় validation skip
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class AuthIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AuthIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('AuthId cannot be empty', 'authId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('AuthId must be a valid UUID', 'authId');
    }
    return new AuthIdVO(trimmed);
  }

  static reconstitute(raw: string): AuthIdVO {
    return new AuthIdVO(raw);
  }
}
