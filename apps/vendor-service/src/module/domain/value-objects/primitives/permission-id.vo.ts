import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidPermissionIdError } from '../../errors/vendor.errors';

export class PermissionIdVO extends BaseIdVO {
  static create(value: string): PermissionIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidPermissionIdError(value);
    }
    return new PermissionIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
