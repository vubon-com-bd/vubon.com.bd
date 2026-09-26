import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidBankAccountIdError } from '../../errors/vendor.errors';

export class BankAccountIdVO extends BaseIdVO {
  static create(value: string): BankAccountIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidBankAccountIdError(value);
    }
    return new BankAccountIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
