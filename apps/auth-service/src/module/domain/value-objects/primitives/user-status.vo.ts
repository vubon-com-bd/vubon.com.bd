import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';

export class UserStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }
  static create(raw: string): UserStatusVO {
    return new UserStatusVO(String(raw).toLowerCase());
  }
}
