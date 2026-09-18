import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo';

export interface UserAddressEntityProps {
  readonly userId: UserIdVO;
  readonly label: string;
  readonly fullName: string;
  readonly phone: string;
  readonly division: string;
  readonly district: string;
  readonly upazila: string;
  readonly addressLine: string;
  readonly postalCode: string | null;
  readonly isDefault: boolean;
}

export class UserAddressEntity extends BaseEntity<AddressIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _label: string;
  private readonly _fullName: string;
  private readonly _phone: string;
  private readonly _division: string;
  private readonly _district: string;
  private readonly _upazila: string;
  private readonly _addressLine: string;
  private readonly _postalCode: string | null;
  private readonly _isDefault: boolean;

  private constructor(
    id: AddressIdVO,
    props: UserAddressEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._userId = props.userId;
    this._label = props.label;
    this._fullName = props.fullName;
    this._phone = props.phone;
    this._division = props.division;
    this._district = props.district;
    this._upazila = props.upazila;
    this._addressLine = props.addressLine;
    this._postalCode = props.postalCode;
    this._isDefault = props.isDefault;
  }

  static create(props: UserAddressEntityProps): UserAddressEntity {
    const now = new Date().toISOString();
    const id = AddressIdVO.create(crypto.randomUUID());
    return new UserAddressEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: AddressIdVO,
    props: UserAddressEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): UserAddressEntity {
    return new UserAddressEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  update(props: Partial<Omit<UserAddressEntityProps, 'userId'>>): UserAddressEntity {
    return new UserAddressEntity(
      this.id,
      { ...this._toProps(), ...props },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  markAsDefault(): UserAddressEntity {
    return new UserAddressEntity(
      this.id,
      { ...this._toProps(), isDefault: true },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  get userId(): UserIdVO { return this._userId; }
  get label(): string { return this._label; }
  get fullName(): string { return this._fullName; }
  get phone(): string { return this._phone; }
  get division(): string { return this._division; }
  get district(): string { return this._district; }
  get upazila(): string { return this._upazila; }
  get addressLine(): string { return this._addressLine; }
  get postalCode(): string | null { return this._postalCode; }
  get isDefault(): boolean { return this._isDefault; }

  private _toProps(): UserAddressEntityProps {
    return {
      userId: this._userId,
      label: this._label,
      fullName: this._fullName,
      phone: this._phone,
      division: this._division,
      district: this._district,
      upazila: this._upazila,
      addressLine: this._addressLine,
      postalCode: this._postalCode,
      isDefault: this._isDefault,
    };
  }
}
