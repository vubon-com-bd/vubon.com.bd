/**
 * VendorBankAccountEntity — Child Entity
 * @module vendor-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import {
  VendorBankAccountVO,
  type VendorBankAccountVOProps,
} from '../value-objects/composites/vendor-bank-account.vo.js';

export interface VendorBankAccountEntityProps {
  readonly vo: VendorBankAccountVO;
}

export class VendorBankAccountEntity extends BaseEntity<string> {
  private _vo: VendorBankAccountVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorBankAccountEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
  }

  // ═══ Getters ═══
  get vo(): VendorBankAccountVO { return this._vo; }
  get bankAccountId() { return this._vo.id; }
  get vendorId() { return this._vo.vendorId; }
  get bankName() { return this._vo.bankName; }
  get accountNumber() { return this._vo.accountNumber; }
  get accountHolderName(): string { return this._vo.accountHolderName; }
  get branchName(): string | undefined { return this._vo.branchName; }
  get routingNumber(): string | undefined { return this._vo.routingNumber; }
  get swiftCode(): string | undefined { return this._vo.swiftCode; }
  get iban(): string | undefined { return this._vo.iban; }
  get accountType() { return this._vo.accountType; }
  get currency(): string { return this._vo.currency; }
  get isDefault(): boolean { return this._vo.isDefault; }
  get isVerified(): boolean { return this._vo.isVerified; }
  get verifiedAt(): string | undefined { return this._vo.verifiedAt; }

  // ═══ Predicates ═══
  isSavings(): boolean { return this._vo.isSavings(); }
  isCurrent(): boolean { return this._vo.isCurrent(); }
  isBusiness(): boolean { return this._vo.isBusiness(); }
  isBDT(): boolean { return this._vo.isBDT(); }
  isInternational(): boolean { return this._vo.isInternational(); }
  isPayable(): boolean { return this._vo.isPayable(); }
  needsReverification(): boolean { return this._vo.needsReverification(); }

  maskedAccountNumber(): string { return this._vo.maskedAccountNumber(); }

  // ═══ Business Actions ═══
  markDefault(now: string = new Date().toISOString()): void {
    if (this.isDefault) return;
    if (!this.isVerified) {
      throw new BusinessRuleError(
        'Cannot mark unverified bank account as default',
        'BANK_ACCOUNT_NOT_VERIFIED',
        { bankAccountId: this.id },
      );
    }
    const current = this._vo.value;
    this._vo = VendorBankAccountVO.create({ ...current, isDefault: true });
    this.touch(now);
  }

  unmarkDefault(now: string = new Date().toISOString()): void {
    if (!this.isDefault) return;
    const current = this._vo.value;
    this._vo = VendorBankAccountVO.create({ ...current, isDefault: false });
    this.touch(now);
  }

  verify(now: string = new Date().toISOString()): void {
    if (this.isVerified) return;
    const current = this._vo.value;
    this._vo = VendorBankAccountVO.create({
      ...current,
      isVerified: true,
      verifiedAt: now,
    });
    this.touch(now);
  }

  unverify(now: string = new Date().toISOString()): void {
    if (!this.isVerified) return;
    const current = this._vo.value;
    this._vo = VendorBankAccountVO.create({
      ...current,
      isVerified: false,
      verifiedAt: undefined,
      isDefault: false,
    });
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: VendorBankAccountVO;
    now: string;
  }): VendorBankAccountEntity {
    return new VendorBankAccountEntity(
      params.id,
      params.now,
      params.now,
      { vo: params.vo },
      null,
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: VendorBankAccountEntityProps;
  }): VendorBankAccountEntity {
    return new VendorBankAccountEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}
