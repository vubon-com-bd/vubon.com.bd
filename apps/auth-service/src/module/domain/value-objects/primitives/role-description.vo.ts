import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class RoleDescriptionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RoleDescriptionVO {
    BaseCodeVO.validateNonEmpty(raw, 'RoleDescription');
    return new RoleDescriptionVO(raw);
  }
}
