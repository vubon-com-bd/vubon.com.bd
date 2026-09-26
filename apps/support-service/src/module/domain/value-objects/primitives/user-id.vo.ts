/**
 * UserIdVO — Reference to user-service user (ID only, no embed)
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 * Rule: cross-service reference — শুধু ID, entity embed করা যাবে না
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 1;
const MAX_LENGTH = 64;

export class UserIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('UserId must be a string', 'userId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `UserId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'userId',
      );
    }
    return new UserIdVO(trimmed);
  }

  static fromAuth(userId: string): UserIdVO {
    return UserIdVO.create(userId);
  }
}
