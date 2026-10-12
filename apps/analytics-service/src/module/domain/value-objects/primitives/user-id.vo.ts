/**
 * User ID Value Object
 * @module analytics-service/domain/value-objects/primitives
 *
 * Cross-service User reference (shudhu ID)।
 * Business Rule:
 * - UUID format
 * - Analytics-এ shudhu reference — full User entity embed নয়
 * - Anonymous session-এ optional
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import type { UserId } from '@vubon/shared-types/common';

export class UserIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (typeof raw !== 'string') {
      throw new Error('UserId must be a string');
    }

    const trimmed = raw.trim();

    if (trimmed.length === 0) {
      throw new Error('UserId cannot be empty');
    }

    if (!REGEX.UUID.test(trimmed)) {
      throw new Error(`UserId must be a valid UUID: "${trimmed}"`);
    }

    return new UserIdVO(trimmed);
  }

  static fromBranded(id: UserId): UserIdVO {
    return UserIdVO.create(id as unknown as string);
  }

  toBranded(): UserId {
    return this.value as unknown as UserId;
  }
}
