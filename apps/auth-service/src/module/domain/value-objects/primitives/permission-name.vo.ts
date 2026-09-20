import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class PermissionNameVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PermissionNameVO {
    BaseCodeVO.validateNonEmpty(raw, 'PermissionName');
    return new PermissionNameVO(raw);
  }
}
