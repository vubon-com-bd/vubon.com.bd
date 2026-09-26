/**
 * UserIdVO — User identity value object
 * @module auth-service/domain/value-objects/primitives
 *
 * Business rules:
 * - Non-empty string
 * - Max 64 chars
 * - Immutable
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import type { UserId } from '@vubon/shared-types/common';

const MAX_LENGTH = 64;

export class UserIdVO extends BaseVO<UserId> {
  private constructor(value: UserId) {
    super(value);
  }

  static of(raw: string): UserIdVO {
    if (typeof raw !== 'string') {
      throw new Error('UserId must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('UserId cannot be empty');
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new Error(`UserId exceeds max length (${MAX_LENGTH})`);
    }
    return new UserIdVO(trimmed as UserId);
  }

  get length(): number {
    return this.value.length;
  }
}
