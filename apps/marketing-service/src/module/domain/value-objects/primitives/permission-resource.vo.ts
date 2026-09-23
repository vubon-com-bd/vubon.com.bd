import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class PermissionResourceVO extends BaseCodeVO {
  static create(raw: string): PermissionResourceVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('PermissionResource cannot be empty');
    }
    return new PermissionResourceVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
