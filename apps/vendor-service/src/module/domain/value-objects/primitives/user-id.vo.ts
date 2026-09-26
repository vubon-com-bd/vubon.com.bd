import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidUserIdError } from '../../errors/vendor.errors';

export class UserIdVO extends BaseIdVO {
  static create(value: string): UserIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidUserIdError(value);
    }
    return new UserIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
