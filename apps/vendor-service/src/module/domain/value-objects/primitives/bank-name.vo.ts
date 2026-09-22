import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { InvalidBankNameError } from '../../errors/vendor.errors';

export class BankNameVO extends BaseNameVO {
  static create(value: string): BankNameVO {
    const trimmed = value.trim();
    if (trimmed.length < 2 || trimmed.length > 100) {
      throw new InvalidBankNameError(value);
    }
    return new BankNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
