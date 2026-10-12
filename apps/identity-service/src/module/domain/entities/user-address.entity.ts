/**
 * UserAddressEntity — BaseEntity (child of User aggregate)
 * @module identity-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { AddressIdVO } from '../value-objects/primitives/address-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { AddressTypeVO } from '../value-objects/primitives/address-type.vo.js';
import { AddressLineVO } from '../value-objects/primitives/address-line.vo.js';
import { CityVO } from '../value-objects/primitives/city.vo.js';
import { PostalCodeVO } from '../value-objects/primitives/postal-code.vo.js';

export interface UserAddressEntityProps {
  readonly userId: UserIdVO;
  readonly type: AddressTypeVO;
  label?: string;
  fullName: string;
  phone: string;
  addressLine1: AddressLineVO;
  addressLine2?: AddressLineVO;
  city: CityVO;
  state: string;
  division: string;
  district: string;
  upazila?: string;
  postalCode: PostalCodeVO;
  country: string;
  isDefault: boolean;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
  isVerified: boolean;
}

export class UserAddressEntity extends BaseEntity<string> {
  private props: UserAddressEntityProps;

  private constructor(
    id: AddressIdVO,
    createdAt: string,
    updatedAt: string,
    props: UserAddressEntityProps,
  ) {
    super(id.value, createdAt, updatedAt, null);
    this.props = props;
  }

  get addressId(): AddressIdVO { return AddressIdVO.reconstitute(this.id); }
  get userId(): UserIdVO { return this.props.userId; }
  get type(): AddressTypeVO { return this.props.type; }
  get label(): string | undefined { return this.props.label; }
  get fullName(): string { return this.props.fullName; }
  get phone(): string { return this.props.phone; }
  get addressLine1(): AddressLineVO { return this.props.addressLine1; }
  get addressLine2(): AddressLineVO | undefined { return this.props.addressLine2; }
  get city(): CityVO { return this.props.city; }
  get state(): string { return this.props.state; }
  get division(): string { return this.props.division; }
  get district(): string { return this.props.district; }
  get upazila(): string | undefined { return this.props.upazila; }
  get postalCode(): PostalCodeVO { return this.props.postalCode; }
  get country(): string { return this.props.country; }
  get isDefault(): boolean { return this.props.isDefault; }
  get isDefaultShipping(): boolean { return this.props.isDefaultShipping; }
  get isDefaultBilling(): boolean { return this.props.isDefaultBilling; }
  get isVerified(): boolean { return this.props.isVerified; }

  get fullAddress(): string {
    const parts = [
      this.props.addressLine1.value,
      this.props.addressLine2?.value,
      this.props.city.value,
      this.props.district,
      this.props.division,
      this.props.postalCode.value,
      this.props.country,
    ].filter(Boolean);
    return parts.join(', ');
  }

  isBangladeshi(): boolean { return this.props.country === 'BD'; }

  update(patch: Partial<Omit<UserAddressEntityProps, 'userId'>>, now: string = new Date().toISOString()): void {
    this.props = { ...this.props, ...patch };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  markAsDefault(now: string = new Date().toISOString()): void {
    this.props = { ...this.props, isDefault: true };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  unmarkAsDefault(now: string = new Date().toISOString()): void {
    if (this.props.isDefaultBilling || this.props.isDefaultShipping) {
      throw new BusinessRuleError(
        'Cannot unset default when marked as default billing/shipping',
        'ADDRESS_IS_DEFAULT',
        { addressId: this.id },
      );
    }
    this.props = { ...this.props, isDefault: false };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  verify(now: string = new Date().toISOString()): void {
    this.props = { ...this.props, isVerified: true };
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: AddressIdVO;
    props: Omit<UserAddressEntityProps, 'isDefault' | 'isDefaultShipping' | 'isDefaultBilling' | 'isVerified'>;
    now: string;
  }): UserAddressEntity {
    return new UserAddressEntity(params.id, params.now, params.now, {
      ...params.props,
      isDefault: false,
      isDefaultShipping: false,
      isDefaultBilling: false,
      isVerified: false,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: UserAddressEntityProps;
  }): UserAddressEntity {
    return new UserAddressEntity(
      AddressIdVO.reconstitute(params.id),
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }
}
