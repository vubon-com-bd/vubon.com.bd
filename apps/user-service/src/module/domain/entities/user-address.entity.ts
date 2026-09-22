import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { AddressLabelVO } from '../value-objects/primitives/address-label.vo';
import { AddressLineVO } from '../value-objects/primitives/address-line.vo';
import { CityVO } from '../value-objects/primitives/city.vo';
import { DistrictVO } from '../value-objects/primitives/district.vo';
import { DivisionVO } from '../value-objects/primitives/division.vo';
import { PostalCodeVO } from '../value-objects/primitives/postal-code.vo';

export interface UserAddressEntityProps {
  readonly userId: UserIdVO;
  readonly label: AddressLabelVO | null;
  readonly line1: AddressLineVO;
  readonly line2: AddressLineVO | null;
  readonly city: CityVO;
  readonly district: DistrictVO;
  readonly division: DivisionVO;
  readonly postalCode: PostalCodeVO | null;
  readonly isDefault: boolean;
}

export class UserAddressEntity extends BaseEntity<AddressIdVO> {
  private readonly _userId: UserIdVO;
  private readonly _label: AddressLabelVO | null;
  private readonly _line1: AddressLineVO;
  private readonly _line2: AddressLineVO | null;
  private readonly _city: CityVO;
  private readonly _district: DistrictVO;
  private readonly _division: DivisionVO;
  private readonly _postalCode: PostalCodeVO | null;
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
    this._line1 = props.line1;
    this._line2 = props.line2;
    this._city = props.city;
    this._district = props.district;
    this._division = props.division;
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
  get label(): AddressLabelVO | null { return this._label; }
  get line1(): AddressLineVO { return this._line1; }
  get line2(): AddressLineVO | null { return this._line2; }
  get city(): CityVO { return this._city; }
  get district(): DistrictVO { return this._district; }
  get division(): DivisionVO { return this._division; }
  get postalCode(): PostalCodeVO | null { return this._postalCode; }
  get isDefault(): boolean { return this._isDefault; }

  private _toProps(): UserAddressEntityProps {
    return {
      userId: this._userId,
      label: this._label,
      line1: this._line1,
      line2: this._line2,
      city: this._city,
      district: this._district,
      division: this._division,
      postalCode: this._postalCode,
      isDefault: this._isDefault,
    };
  }
}
