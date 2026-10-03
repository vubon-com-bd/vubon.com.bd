/**
 * ShippingAddressVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ShippingAddressIdVO } from '../primitives/shipping-address-id.vo.js';
import { ShippingAddressLineVO } from '../primitives/shipping-address-line.vo.js';
import { CustomerIdVO } from '../primitives/customer-id.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface ShippingAddressVOProps {
  readonly id: ShippingAddressIdVO;
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly line: ShippingAddressLineVO;
  readonly label?: string;
}

export class ShippingAddressVO extends BaseVO<ShippingAddressVOProps> {
  private constructor(props: ShippingAddressVOProps) { super(props); }

  static create(props: ShippingAddressVOProps): ShippingAddressVO {
    const vo = new ShippingAddressVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ShippingAddressVOProps): ShippingAddressVO {
    return new ShippingAddressVO(props);
  }

  protected validate(): void {
    if (!this.value.line) {
      throw new ValidationError('Address line is required', 'line');
    }
  }

  get id(): ShippingAddressIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get line(): ShippingAddressLineVO { return this.value.line; }
  get label(): string | undefined { return this.value.label; }

  get oneLine(): string {
    return this.line.oneLine;
  }

  get isInternational(): boolean {
    return this.line.value.country !== 'BD';
  }

  get city(): string { return this.line.value.city; }
  get country(): string { return this.line.value.country; }
  get postalCode(): string | undefined { return this.line.value.postalCode; }
}
