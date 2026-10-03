/**
 * BillingAddressVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BillingAddressIdVO } from '../primitives/billing-address-id.vo.js';
import { BillingAddressLineVO } from '../primitives/billing-address-line.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface BillingAddressVOProps {
  readonly id: BillingAddressIdVO;
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly line: BillingAddressLineVO;
  readonly label?: string;
}

export class BillingAddressVO extends BaseVO<BillingAddressVOProps> {
  private constructor(props: BillingAddressVOProps) { super(props); }

  static create(props: BillingAddressVOProps): BillingAddressVO {
    const vo = new BillingAddressVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: BillingAddressVOProps): BillingAddressVO {
    return new BillingAddressVO(props);
  }

  protected validate(): void {
    if (!this.value.line) {
      throw new ValidationError('Address line is required', 'line');
    }
  }

  get id(): BillingAddressIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get line(): BillingAddressLineVO { return this.value.line; }
  get label(): string | undefined { return this.value.label; }

  get oneLine(): string {
    return this.line.oneLine;
  }

  get city(): string { return this.line.value.city; }
  get country(): string { return this.line.value.country; }
}
