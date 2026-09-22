import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidBusinessDescriptionError } from '../../errors/vendor.errors';

export class BusinessDescriptionVO extends BaseCodeVO {
  static create(value: string): BusinessDescriptionVO {
    const trimmed = value.trim();
    if (trimmed.length > 2000) {
      throw new InvalidBusinessDescriptionError(value);
    }
    return new BusinessDescriptionVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
