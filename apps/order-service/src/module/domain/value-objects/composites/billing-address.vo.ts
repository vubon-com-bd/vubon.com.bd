import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { BillingAddressIdVO } from '../primitives/billing-address-id.vo';
import { BillingAddressLineVO } from '../primitives/billing-address-line.vo';
import { CustomerIdVO } from '../primitives/customer-id.vo';

export interface BillingAddressProps {
  readonly id: BillingAddressIdVO;
  readonly customerId: CustomerIdVO;
  readonly line1: BillingAddressLineVO;
  readonly line2: BillingAddressLineVO | null;
  readonly city: string;
  readonly district: string;
  readonly division: string;
  readonly postalCode: string | null;
  readonly country: string;
}

export class BillingAddressVO extends BaseVO<BillingAddressProps> {
  private constructor(props: BillingAddressProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: BillingAddressProps): BillingAddressVO {
    return new BillingAddressVO(props);
  }

  get id(): BillingAddressIdVO { return this.value.id; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get line1(): BillingAddressLineVO { return this.value.line1; }
  get line2(): BillingAddressLineVO | null { return this.value.line2; }
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
