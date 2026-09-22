import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';

export class UserIdVO extends BaseIdVO {
  static create(value: string): UserIdVO {
    if (!value || value.trim().length < 3) {
      throw new Error('Invalid user id');
    }
    return new UserIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
