import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class PermissionIdVO extends BaseIdVO {
  static create(raw: string): PermissionIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('PermissionId cannot be empty');
    }
    return new PermissionIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
