import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

export class UserRoleVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  static create(raw: string): UserRoleVO {
    return new UserRoleVO(String(raw).toLowerCase());
  }
}
