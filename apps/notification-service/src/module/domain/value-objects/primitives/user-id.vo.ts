/**
 * UserId Value Object (Cross-Service Reference)
 * @module notification-service/domain/value-objects/primitives
 *
 * ⚠️ External Aggregate Reference — Identity service এর User।
 * Notification aggregate এই VO কে reference হিসেবে ব্যবহার করবে।
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import type { UserId } from '@vubon/shared-types/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MAX_LENGTH = 128;

export class UserIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('UserId cannot be empty', 'userId');
    }
    const trimmed = raw.trim();
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(`UserId exceeds ${MAX_LENGTH} chars`, 'userId');
    }
    return new UserIdVO(trimmed);
  }

  static reconstitute(raw: string): UserIdVO {
    return new UserIdVO(raw);
  }

  /** Convert to shared-types branded UserId */
  toBranded(): UserId {
    return this.value as UserId;
  }

  /** From shared-types branded UserId */
  static fromBranded(branded: UserId): UserIdVO {
    return new UserIdVO(branded as string);
  }
}
