import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class PermissionActionVO extends BaseCodeVO {
  static create(raw: string): PermissionActionVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('PermissionAction cannot be empty');
    }
    return new PermissionActionVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
