import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

export class UserTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }
  static create(raw: string): UserTypeVO {
    return new UserTypeVO(String(raw).toLowerCase());
  }
}
