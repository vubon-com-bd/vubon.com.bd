/**
 * UserId Value Object
 * @module user-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import type { UserId } from '@vubon/shared-types/common';

export class UserIdVO extends BaseIdVO<UserId> {
  private constructor(value: UserId) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (typeof raw !== 'string') {
      throw new Error('UserId must be a string');
    }
    const trimmed = raw.trim();
    if (trimmed.length < 1) {
      throw new Error('UserId cannot be empty');
    }
    if (trimmed.length > 128) {
      throw new Error('UserId too long (max 128)');
    }
    return new UserIdVO(trimmed as UserId);
  }

  static from(raw: UserId): UserIdVO {
    return new UserIdVO(raw);
  }
}
