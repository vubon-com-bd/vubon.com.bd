import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class UserIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): UserIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
    return new UserIdVO(raw);
  }
}
