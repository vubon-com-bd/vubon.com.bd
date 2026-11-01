/**
 * VendorBankAccountVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর পেআউট bank account।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { BankAccountIdVO } from '../primitives/bank-account-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { BankNameVO } from '../primitives/bank-name.vo.js';
import { BankAccountNumberVO } from '../primitives/bank-account-number.vo.js';

export interface VendorBankAccountVOProps {
  readonly id: BankAccountIdVO;
  readonly vendorId: VendorIdVO;
  readonly bankName: BankNameVO;
  readonly accountNumber: BankAccountNumberVO;
  readonly accountHolderName: string;
  readonly branchName?: string;
  readonly routingNumber?: string;
  readonly swiftCode?: string;
  readonly iban?: string;
  readonly accountType: 'savings' | 'current' | 'business' | 'other';
  readonly currency: string;
  readonly isDefault: boolean;
  readonly isVerified: boolean;
  readonly verifiedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const ACCOUNT_TYPES = new Set(['savings', 'current', 'business', 'other']);

export class VendorBankAccountVO extends BaseVO<VendorBankAccountVOProps> {
  private constructor(props: VendorBankAccountVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorBankAccountVOProps): VendorBankAccountVO {
    const vo = new VendorBankAccountVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorBankAccountVOProps): VendorBankAccountVO {
    return new VendorBankAccountVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!ACCOUNT_TYPES.has(v.accountType)) {
      throw new ValidationError(`Invalid accountType: "${v.accountType}"`, 'accountType');
    }

    if (!v.accountHolderName || v.accountHolderName.trim().length < 2) {
      throw new ValidationError('Account holder name must be at least 2 chars', 'accountHolderName');
    }
    if (v.accountHolderName.length > 100) {
      throw new ValidationError('Account holder name max 100 chars', 'accountHolderName');
    }

    if (v.routingNumber && !/^\d{6,20}$/.test(v.routingNumber)) {
      throw new ValidationError('Routing number must be 6-20 digits', 'routingNumber');
    }

    if (v.swiftCode && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(v.swiftCode)) {
      throw new ValidationError('Invalid SWIFT code format', 'swiftCode');
    }

    if (v.iban && !/^[A-Z]{2}\d{2}[A-Z0-9]{10,30}$/.test(v.iban)) {
      throw new ValidationError('Invalid IBAN format', 'iban');
    }

    if (!v.currency || v.currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }

    if (v.isVerified && !v.verifiedAt) {
      throw new ValidationError('Verified bank account must have verifiedAt', 'verifiedAt');
    }
    if (!v.isVerified && v.verifiedAt) {
      throw new ValidationError('Unverified bank account cannot have verifiedAt', 'verifiedAt');
    }
  }

  // ─── Getters ───
  get id(): BankAccountIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get bankName(): BankNameVO { return this.value.bankName; }
  get accountNumber(): BankAccountNumberVO { return this.value.accountNumber; }
  get accountHolderName(): string { return this.value.accountHolderName; }
  get branchName(): string | undefined { return this.value.branchName; }
  get routingNumber(): string | undefined { return this.value.routingNumber; }
  get swiftCode(): string | undefined { return this.value.swiftCode; }
  get iban(): string | undefined { return this.value.iban; }
  get accountType(): VendorBankAccountVOProps['accountType'] { return this.value.accountType; }
  get currency(): string { return this.value.currency; }
  get isDefault(): boolean { return this.value.isDefault; }
  get isVerified(): boolean { return this.value.isVerified; }
  get verifiedAt(): string | undefined { return this.value.verifiedAt; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isSavings(): boolean { return this.accountType === 'savings'; }
  isCurrent(): boolean { return this.accountType === 'current'; }
  isBusiness(): boolean { return this.accountType === 'business'; }

  hasBranch(): boolean { return this.branchName !== undefined; }
  hasRoutingNumber(): boolean { return this.routingNumber !== undefined; }
  hasSwiftCode(): boolean { return this.swiftCode !== undefined; }
  hasIban(): boolean { return this.iban !== undefined; }

  /** Account is in BDT */
  isBDT(): boolean {
    return this.currency.toUpperCase() === 'BDT';
  }

  /** Account is international */
  isInternational(): boolean {
    return !this.isBDT() && (this.hasSwiftCode() || this.hasIban());
  }

  /** Can be used for payouts */
  isPayable(): boolean {
    return this.isVerified;
  }

  /** Masked account number for display */
  maskedAccountNumber(): string {
    return this.accountNumber.masked();
  }

  /** Verified but older than 1 year — needs re-verification */
  needsReverification(): boolean {
    if (!this.isVerified || !this.verifiedAt) return false;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return new Date(this.verifiedAt) < oneYearAgo;
  }
}
