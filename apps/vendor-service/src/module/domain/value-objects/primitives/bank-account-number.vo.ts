import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidBankAccountNumberError } from '../../errors/vendor.errors';

export class BankAccountNumberVO extends BaseCodeVO {
  static create(value: string): BankAccountNumberVO {
    const trimmed = value.trim();
    if (trimmed.length < 8 || trimmed.length > 30) {
      throw new InvalidBankAccountNumberError(value);
    }
    return new BankAccountNumberVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }
}
