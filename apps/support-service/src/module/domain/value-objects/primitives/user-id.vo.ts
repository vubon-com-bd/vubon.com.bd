import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class UserIdVO extends BaseIdVO {
  static create(value: string): UserIdVO {
    return new UserIdVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
