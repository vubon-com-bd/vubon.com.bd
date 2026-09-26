import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { InvalidBusinessNameError } from '../../errors/vendor.errors';

export class BusinessNameVO extends BaseNameVO {
  static create(value: string): BusinessNameVO {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 200) {
      throw new InvalidBusinessNameError(value);
    }
    return new BusinessNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
