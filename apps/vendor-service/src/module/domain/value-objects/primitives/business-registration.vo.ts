import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidBusinessRegistrationError } from '../../errors/vendor.errors';

export class BusinessRegistrationVO extends BaseCodeVO {
  static create(value: string): BusinessRegistrationVO {
    if (!value || value.trim().length < 5) {
      throw new InvalidBusinessRegistrationError(value);
    }
    return new BusinessRegistrationVO(value.trim());
  }

  private constructor(value: string) {
    super(value);
  }
}
