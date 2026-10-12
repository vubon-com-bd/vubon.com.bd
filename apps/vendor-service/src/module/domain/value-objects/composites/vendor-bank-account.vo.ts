/**
 * VendorBankAccountVO — full bank account info for payouts
 * @module vendor-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BankNameVO } from '../primitives/bank-name.vo.js';
import { BankAccountNumberVO } from '../primitives/bank-account-number.vo.js';
import { BankRoutingNumberVO } from '../primitives/bank-routing-number.vo.js';
import { AccountHolderNameVO } from '../primitives/account-holder-name.vo.js';

export interface VendorBankAccountVOProps {
  readonly bankName: BankNameVO;
  readonly accountNumber: BankAccountNumberVO;
  readonly routingNumber: BankRoutingNumberVO;
  readonly accountHolderName: AccountHolderNameVO;
}

export class VendorBankAccountVO extends BaseVO<VendorBankAccountVOProps> {
  private constructor(props: VendorBankAccountVOProps) {
    super(props);
  }

  static create(props: VendorBankAccountVOProps): VendorBankAccountVO {
    if (!(props.bankName instanceof BankNameVO)) {
      throw new ValidationError('Bank account requires BankNameVO', 'bankName');
    }
    if (!(props.accountNumber instanceof BankAccountNumberVO)) {
      throw new ValidationError('Bank account requires BankAccountNumberVO', 'accountNumber');
    }
    if (!(props.routingNumber instanceof BankRoutingNumberVO)) {
      throw new ValidationError('Bank account requires BankRoutingNumberVO', 'routingNumber');
    }
    if (!(props.accountHolderName instanceof AccountHolderNameVO)) {
      throw new ValidationError('Bank account requires AccountHolderNameVO', 'accountHolderName');
    }
    return new VendorBankAccountVO(props);
  }

  static reconstitute(props: VendorBankAccountVOProps): VendorBankAccountVO {
    return new VendorBankAccountVO(props);
  }

  get bankName(): BankNameVO { return this.value.bankName; }
  get accountNumber(): BankAccountNumberVO { return this.value.accountNumber; }
  get routingNumber(): BankRoutingNumberVO { return this.value.routingNumber; }
  get accountHolderName(): AccountHolderNameVO { return this.value.accountHolderName; }

  masked(): {
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    accountHolderName: string;
  } {
    return {
      bankName: this.value.bankName.value,
      accountNumber: this.value.accountNumber.masked(),
      routingNumber: this.value.routingNumber.value,
      accountHolderName: this.value.accountHolderName.value,
    };
  }

  /** Stable fingerprint for duplicate detection (last4 + routing). */
  fingerprint(): string {
    return `${this.value.routingNumber.value}:${this.value.accountNumber.last4()}`;
  }
}
