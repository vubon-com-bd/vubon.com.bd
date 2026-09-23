import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

/**
 * Cross-service reference — UserId শুধু ID হিসেবে
 * Marketing service user entity embed করে না।
 */
export class UserIdVO extends BaseIdVO {
  static create(raw: string): UserIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
    return new UserIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
