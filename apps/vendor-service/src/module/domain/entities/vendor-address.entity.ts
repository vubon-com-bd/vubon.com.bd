import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo';
import { AddressLabelVO } from '../value-objects/primitives/address-label.vo';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo';

export interface VendorAddressEntityProps {
  readonly vendorId: VendorIdVO;
  readonly label: AddressLabelVO;
  readonly division: string;
  readonly district: string;
  readonly upazila: string;
  readonly addressLine: string;
  readonly postalCode: string | null;
  readonly isDefault: boolean;
}

export class VendorAddressEntity extends BaseEntity<AddressIdVO> {
  private readonly _vendorId: VendorIdVO;
  private readonly _label: AddressLabelVO;
  private readonly _division: string;
  private readonly _district: string;
  private readonly _upazila: string;
  private readonly _addressLine: string;
  private readonly _postalCode: string | null;
  private readonly _isDefault: boolean;

  private constructor(
    id: AddressIdVO,
    props: VendorAddressEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._label = props.label;
    this._division = props.division;
    this._district = props.district;
    this._upazila = props.upazila;
    this._addressLine = props.addressLine;
    this._postalCode = props.postalCode;
    this._isDefault = props.isDefault;
  }

  static create(props: VendorAddressEntityProps): VendorAddressEntity {
    const now = new Date().toISOString();
    const id = AddressIdVO.create(crypto.randomUUID());
    return new VendorAddressEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AddressIdVO,
    props: VendorAddressEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VendorAddressEntity {
    return new VendorAddressEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  update(props: Partial<Omit<VendorAddressEntityProps, 'vendorId'>>): VendorAddressEntity {
    return new VendorAddressEntity(
      this.id,
      { ...this._toProps(), ...props },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markDefault(): VendorAddressEntity {
    return new VendorAddressEntity(
      this.id,
      { ...this._toProps(), isDefault: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get vendorId(): VendorIdVO { return this._vendorId; }
  get label(): AddressLabelVO { return this._label; }
  get division(): string { return this._division; }
  get district(): string { return this._district; }
  get upazila(): string { return this._upazila; }
  get addressLine(): string { return this._addressLine; }
  get postalCode(): string | null { return this._postalCode; }
  get isDefault(): boolean { return this._isDefault; }

  private _toProps(): VendorAddressEntityProps {
    return {
      vendorId: this._vendorId,
      label: this._label,
      division: this._division,
      district: this._district,
      upazila: this._upazila,
      addressLine: this._addressLine,
      postalCode: this._postalCode,
      isDefault: this._isDefault,
    };
  }
}
