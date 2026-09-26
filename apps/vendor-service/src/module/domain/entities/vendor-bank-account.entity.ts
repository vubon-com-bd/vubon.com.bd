import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BankAccountIdVO } from '../value-objects/primitives/bank-account-id.vo';
import { BankAccountNumberVO } from '../value-objects/primitives/bank-account-number.vo';
import { BankNameVO } from '../value-objects/primitives/bank-name.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';
import { BankAccountAddedEvent } from '../events/vendor.events';

export interface VendorBankAccountEntityProps {
  readonly vendorId: VendorIdVO;
  readonly accountNumber: BankAccountNumberVO;
  readonly bankName: BankNameVO;
  readonly accountHolderName: string;
  readonly branchName: string | null;
  readonly routingNumber: string | null;
  readonly isDefault: boolean;
  readonly isVerified?: boolean;
}

export class VendorBankAccountEntity extends AggregateRoot<BankAccountIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _accountNumber: BankAccountNumberVO;
  private readonly _bankName: BankNameVO;
  private readonly _accountHolderName: string;
  private readonly _branchName: string | null;
  private readonly _routingNumber: string | null;
  private readonly _isDefault: boolean;
  private readonly _isVerified: boolean;

  private constructor(
    id: BankAccountIdVO,
    props: VendorBankAccountEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._accountNumber = props.accountNumber;
    this._bankName = props.bankName;
    this._accountHolderName = props.accountHolderName;
    this._branchName = props.branchName;
    this._routingNumber = props.routingNumber;
    this._isDefault = props.isDefault;
    this._isVerified = props.isVerified ?? false;
  }

  static create(props: VendorBankAccountEntityProps): VendorBankAccountEntity {
    const now = new Date().toISOString();
    const id = BankAccountIdVO.create(crypto.randomUUID());
    const entity = new VendorBankAccountEntity(id, props, now, now, null);
    entity.addDomainEvent(
      new BankAccountAddedEvent(
        id.value,
        props.vendorId.value,
        id.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: BankAccountIdVO,
    props: VendorBankAccountEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorBankAccountEntity {
    return new VendorBankAccountEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  verify(): VendorBankAccountEntity {
    return new VendorBankAccountEntity(
      this.id,
      { ...this._toProps(), isVerified: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markDefault(): VendorBankAccountEntity {
    return new VendorBankAccountEntity(
      this.id,
      { ...this._toProps(), isDefault: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get accountNumber(): BankAccountNumberVO { return this._accountNumber; }
  get bankName(): BankNameVO { return this._bankName; }
  get accountHolderName(): string { return this._accountHolderName; }
  get branchName(): string | null { return this._branchName; }
  get routingNumber(): string | null { return this._routingNumber; }
  get isDefault(): boolean { return this._isDefault; }
  get isVerified(): boolean { return this._isVerified; }

  private _toProps(): VendorBankAccountEntityProps {
    return {
      vendorId: this._vendorId,
      accountNumber: this._accountNumber,
      bankName: this._bankName,
      accountHolderName: this._accountHolderName,
      branchName: this._branchName,
      routingNumber: this._routingNumber,
      isDefault: this._isDefault,
      isVerified: this._isVerified,
    };
  }
}
