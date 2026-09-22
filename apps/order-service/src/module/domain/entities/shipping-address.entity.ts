import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ShippingAddressIdVO } from '../value-objects/primitives/shipping-address-id.vo';
import { ShippingAddressLineVO } from '../value-objects/primitives/shipping-address-line.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';

export interface ShippingAddressEntityProps {
  readonly customerId: CustomerIdVO;
  readonly line1: ShippingAddressLineVO;
  readonly line2: ShippingAddressLineVO | null;
  readonly city: string;
  readonly district: string;
  readonly division: string;
  readonly postalCode: string | null;
  readonly country: string;
}

export class ShippingAddressEntity extends BaseEntity<ShippingAddressIdVO> {
  private readonly _customerId: CustomerIdVO;
  private readonly _line1: ShippingAddressLineVO;
  private readonly _line2: ShippingAddressLineVO | null;
  private readonly _city: string;
  private readonly _district: string;
  private readonly _division: string;
  private readonly _postalCode: string | null;
  private readonly _country: string;

  private constructor(
    id: ShippingAddressIdVO,
    props: ShippingAddressEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._customerId = props.customerId;
    this._line1 = props.line1;
    this._line2 = props.line2;
    this._city = props.city;
    this._district = props.district;
    this._division = props.division;
    this._postalCode = props.postalCode;
    this._country = props.country;
  }

  static create(props: ShippingAddressEntityProps): ShippingAddressEntity {
    const now = new Date().toISOString();
    const id = ShippingAddressIdVO.create(crypto.randomUUID());
    return new ShippingAddressEntity(id, props, now, now);
  }

  static reconstitute(
    id: ShippingAddressIdVO,
    props: ShippingAddressEntityProps,
    createdAt: string,
    updatedAt: string,
  ): ShippingAddressEntity {
    return new ShippingAddressEntity(id, props, createdAt, updatedAt);
  }

  get customerId(): CustomerIdVO { return this._customerId; }
  get line1(): ShippingAddressLineVO { return this._line1; }
  get line2(): ShippingAddressLineVO | null { return this._line2; }
  get city(): string { return this._city; }
  get district(): string { return this._district; }
  get division(): string { return this._division; }
  get postalCode(): string | null { return this._postalCode; }
  get country(): string { return this._country; }
}
