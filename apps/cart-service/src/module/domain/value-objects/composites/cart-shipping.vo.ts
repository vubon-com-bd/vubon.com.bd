import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CartShippingIdVO } from '../primitives/cart-shipping-id.vo';
import { CartShippingMethodVO } from '../primitives/cart-shipping-method.vo';
import { AddressIdVO } from '../primitives/address-id.vo';

export interface CartShippingVOProps {
  readonly id: CartShippingIdVO;
  readonly method: CartShippingMethodVO;
  readonly cost: number;
  readonly currency: string;
  readonly addressId: AddressIdVO | null;
  readonly estimatedDays: number | null;
}

export class CartShippingVO extends BaseVO<CartShippingVOProps> {
  private constructor(props: CartShippingVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartShippingVOProps): CartShippingVO {
    return new CartShippingVO(props);
  }

  get id(): CartShippingIdVO { return this.value.id; }
  get method(): CartShippingMethodVO { return this.value.method; }
  get cost(): number { return this.value.cost; }
  get currency(): string { return this.value.currency; }
  get addressId(): AddressIdVO | null { return this.value.addressId; }
  get estimatedDays(): number | null { return this.value.estimatedDays; }
}
