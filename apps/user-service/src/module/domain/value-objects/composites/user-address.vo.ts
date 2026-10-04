/**
 * UserAddressVO — Composite VO
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AddressIdVO } from '../primitives/address-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { AddressLabelVO } from '../primitives/address-label.vo.js';
import { AddressLineVO } from '../primitives/address-line.vo.js';
import { CityVO } from '../primitives/city.vo.js';
import { DistrictVO } from '../primitives/district.vo.js';
import { DivisionVO } from '../primitives/division.vo.js';
import { PostalCodeVO } from '../primitives/postal-code.vo.js';

export interface UserAddressVOProps {
  readonly id: AddressIdVO;
  readonly userId: UserIdVO;
  readonly label: AddressLabelVO;
  readonly line: AddressLineVO;
  readonly city: CityVO;
  readonly district: DistrictVO;
  readonly division: DivisionVO;
  readonly postalCode: PostalCodeVO;
  readonly isDefault: boolean;
}

export class UserAddressVO extends BaseVO<UserAddressVOProps> {
  private constructor(props: UserAddressVOProps) {
    super(props);
  }

  static create(props: UserAddressVOProps): UserAddressVO {
    if (!props.id) throw new Error('UserAddressVO: id required');
    if (!props.userId) throw new Error('UserAddressVO: userId required');
    return new UserAddressVO(props);
  }

  get id(): AddressIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get label(): AddressLabelVO { return this.value.label; }
  get line(): AddressLineVO { return this.value.line; }
  get city(): CityVO { return this.value.city; }
  get district(): DistrictVO { return this.value.district; }
  get division(): DivisionVO { return this.value.division; }
  get postalCode(): PostalCodeVO { return this.value.postalCode; }
  get isDefault(): boolean { return this.value.isDefault; }

  toOneLine(): string {
    return [
      this.value.line.value,
      this.value.city.value,
      this.value.district.value,
      this.value.division.value,
      this.value.postalCode.value,
    ].join(', ');
  }

  isInDhaka(): boolean {
    return this.value.division.isDhaka();
  }
}
