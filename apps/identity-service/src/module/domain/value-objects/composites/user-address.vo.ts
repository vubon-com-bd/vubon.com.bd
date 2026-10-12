/**
 * UserAddressVO
 * @module identity-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { AddressIdVO } from '../primitives/address-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';
import { AddressTypeVO } from '../primitives/address-type.vo.js';
import { AddressLineVO } from '../primitives/address-line.vo.js';
import { CityVO } from '../primitives/city.vo.js';
import { PostalCodeVO } from '../primitives/postal-code.vo.js';

export interface UserAddressVOProps {
  readonly id: AddressIdVO;
  readonly userId: UserIdVO;
  readonly type: AddressTypeVO;
  readonly label?: string;
  readonly fullName: string;
  readonly phone: string;
  readonly addressLine1: AddressLineVO;
  readonly addressLine2?: AddressLineVO;
  readonly city: CityVO;
  readonly state: string;
  readonly division: string;
  readonly district: string;
  readonly upazila?: string;
  readonly postalCode: PostalCodeVO;
  readonly country: string;
  readonly isDefault: boolean;
  readonly isDefaultShipping: boolean;
  readonly isDefaultBilling: boolean;
  readonly isVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class UserAddressVO extends BaseVO<UserAddressVOProps> {
  private constructor(props: UserAddressVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: UserAddressVOProps): UserAddressVO {
    const vo = new UserAddressVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: UserAddressVOProps): UserAddressVO {
    return new UserAddressVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.country === 'BD' && !v.division) {
      throw new ValidationError('Division is required for Bangladesh', 'division');
    }
    if (v.isDefaultBilling && v.isDefaultShipping && v.type.isBilling()) {
      // allowed — just checking logic
    }
  }

  get id(): AddressIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get type(): AddressTypeVO { return this.value.type; }
  get label(): string | undefined { return this.value.label; }
  get fullName(): string { return this.value.fullName; }
  get phone(): string { return this.value.phone; }
  get addressLine1(): AddressLineVO { return this.value.addressLine1; }
  get addressLine2(): AddressLineVO | undefined { return this.value.addressLine2; }
  get city(): CityVO { return this.value.city; }
  get state(): string { return this.value.state; }
  get division(): string { return this.value.division; }
  get district(): string { return this.value.district; }
  get upazila(): string | undefined { return this.value.upazila; }
  get postalCode(): PostalCodeVO { return this.value.postalCode; }
  get country(): string { return this.value.country; }
  get isDefault(): boolean { return this.value.isDefault; }
  get isDefaultShipping(): boolean { return this.value.isDefaultShipping; }
  get isDefaultBilling(): boolean { return this.value.isDefaultBilling; }
  get isVerified(): boolean { return this.value.isVerified; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  get fullAddress(): string {
    const parts = [
      this.value.addressLine1.value,
      this.value.addressLine2?.value,
      this.value.city.value,
      this.value.district,
      this.value.division,
      this.value.postalCode.value,
      this.value.country,
    ].filter(Boolean);
    return parts.join(', ');
  }

  isBangladeshi(): boolean { return this.value.country === 'BD'; }
}
