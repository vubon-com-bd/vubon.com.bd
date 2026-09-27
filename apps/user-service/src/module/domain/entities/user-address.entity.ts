/**
 * UserAddressEntity — BaseEntity
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { AddressIdVO } from '../value-objects/primitives/address-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { AddressLabelVO } from '../value-objects/primitives/address-label.vo.js';
import { AddressLineVO } from '../value-objects/primitives/address-line.vo.js';
import { CityVO } from '../value-objects/primitives/city.vo.js';
import { DistrictVO } from '../value-objects/primitives/district.vo.js';
import { DivisionVO } from '../value-objects/primitives/division.vo.js';
import { PostalCodeVO } from '../value-objects/primitives/postal-code.vo.js';
import { UserAddressVO } from '../value-objects/composites/user-address.vo.js';

export interface UserAddressEntityProps {
  readonly addressId: AddressIdVO;
  readonly userId: UserIdVO;
  readonly label: AddressLabelVO;
  readonly line: AddressLineVO;
  readonly city: CityVO;
  readonly district: DistrictVO;
  readonly division: DivisionVO;
  readonly postalCode: PostalCodeVO;
  readonly isDefault: boolean;
}

export class UserAddressEntity extends BaseEntity<string> {
  private _label: AddressLabelVO;
  private _line: AddressLineVO;
  private _city: CityVO;
  private _district: DistrictVO;
  private _division: DivisionVO;
  private _postalCode: PostalCodeVO;
  private _isDefault: boolean;
  private readonly _userId: UserIdVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: UserAddressEntityProps,
    deletedAt?: string | null
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._label = props.label;
    this._line = props.line;
    this._city = props.city;
    this._district = props.district;
    this._division = props.division;
    this._postalCode = props.postalCode;
    this._isDefault = props.isDefault;
    this._userId = props.userId;
  }

  get label(): AddressLabelVO { return this._label; }
  get line(): AddressLineVO { return this._line; }
  get city(): CityVO { return this._city; }
  get district(): DistrictVO { return this._district; }
  get division(): DivisionVO { return this._division; }
  get postalCode(): PostalCodeVO { return this._postalCode; }
  get isDefault(): boolean { return this._isDefault; }
  get userId(): UserIdVO { return this._userId; }

  static create(params: {
    addressId: AddressIdVO;
    userId: UserIdVO;
    label: AddressLabelVO;
    line: AddressLineVO;
    city: CityVO;
    district: DistrictVO;
    division: DivisionVO;
    postalCode: PostalCodeVO;
    isDefault: boolean;
    now: string;
  }): UserAddressEntity {
    return new UserAddressEntity(
      params.addressId.value,
      params.now,
      params.now,
      params,
      null
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: UserAddressEntityProps;
  }): UserAddressEntity {
    return new UserAddressEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt
    );
  }

  update(fields: {
    label?: AddressLabelVO;
    line?: AddressLineVO;
    city?: CityVO;
    district?: DistrictVO;
    division?: DivisionVO;
    postalCode?: PostalCodeVO;
  }): void {
    if (fields.label) this._label = fields.label;
    if (fields.line) this._line = fields.line;
    if (fields.city) this._city = fields.city;
    if (fields.district) this._district = fields.district;
    if (fields.division) this._division = fields.division;
    if (fields.postalCode) this._postalCode = fields.postalCode;
  }

  makeDefault(): void {
    this._isDefault = true;
  }

  unmarkDefault(): void {
    this._isDefault = false;
  }

  toAddressVO(): UserAddressVO {
    return UserAddressVO.create({
      id: AddressIdVO.create(this.id),
      userId: this._userId,
      label: this._label,
      line: this._line,
      city: this._city,
      district: this._district,
      division: this._division,
      postalCode: this._postalCode,
      isDefault: this._isDefault,
    });
  }
}
