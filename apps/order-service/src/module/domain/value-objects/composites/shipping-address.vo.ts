import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ShippingAddressIdVO } from '../primitives/shipping-address-id.vo';
import { ShippingAddressLineVO } from '../primitives/shipping-address-line.vo';
import { CustomerIdVO } from '../primitives/customer-id.vo';

export interface ShippingAddressProps {
  readonly id: ShippingAddressIdVO;
  readonly customerId: CustomerIdVO;
  readonly line1: ShippingAddressLineVO;
  readonly line2: ShippingAddressLineVO | null;
  readonly city: string;
  readonly district: string;
  readonly division: string;
  readonly postalCode: string | null;
  readonly country: string;
}

export class ShippingAddressVO extends BaseVO<ShippingAddressProps> {
  private constructor(props: ShippingAddressProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ShippingAddressProps): ShippingAddressVO {
    return new ShippingAddressVO(props);
  }

  get id(): ShippingAddressIdVO { return this.value.id; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get line1(): ShippingAddressLineVO { return this.value.line1; }
  get line2(): ShippingAddressLineVO | null { return this.value.line2; }
  get city(): string { return this.value.city; }
  get district(): string { return this.value.district; }
  get division(): string { return this.value.division; }
  get postalCode(): string | null { return this.value.postalCode; }
  get country(): string { return this.value.country; }

  get formatted(): string {
    return [
      this.value.line1.value,
      this.value.line2?.value,
      this.value.city,
      this.value.district,
      this.value.division,
      this.value.postalCode,
      this.value.country,
    ]
      .filter(Boolean)
      .join(', ');
  }
}
