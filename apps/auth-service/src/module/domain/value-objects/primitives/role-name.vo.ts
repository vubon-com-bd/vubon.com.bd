import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class RoleNameVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RoleNameVO {
    BaseCodeVO.validateNonEmpty(raw, 'RoleName');
    return new RoleNameVO(raw);
  }
}
