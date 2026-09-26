import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { BankAccountIdVO } from '../primitives/bank-account-id.vo';
import { BankAccountNumberVO } from '../primitives/bank-account-number.vo';
import { BankNameVO } from '../primitives/bank-name.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface VendorBankAccountProps {
  readonly id: BankAccountIdVO;
  readonly vendorId: VendorIdVO;
  readonly accountNumber: BankAccountNumberVO;
  readonly bankName: BankNameVO;
  readonly accountHolderName: string;
  readonly branchName: string | null;
  readonly routingNumber: string | null;
  readonly isDefault: boolean;
}

export class VendorBankAccountVO extends BaseVO<VendorBankAccountProps> {
  private constructor(props: VendorBankAccountProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: VendorBankAccountProps): VendorBankAccountVO {
    return new VendorBankAccountVO(props);
  }

  get id(): BankAccountIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get accountNumber(): BankAccountNumberVO { return this.value.accountNumber; }
  get bankName(): BankNameVO { return this.value.bankName; }
  get accountHolderName(): string { return this.value.accountHolderName; }
  get branchName(): string | null { return this.value.branchName; }
  get routingNumber(): string | null { return this.value.routingNumber; }
  get isDefault(): boolean { return this.value.isDefault; }

  get maskedAccountNumber(): string {
    const num = this.value.accountNumber.value;
    return '*'.repeat(Math.max(0, num.length - 4)) + num.slice(-4);
  }
}
