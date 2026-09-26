import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class UserIdVO extends BaseIdVO {
  static create(value: string): UserIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('UserId cannot be empty');
    }
    return new UserIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
