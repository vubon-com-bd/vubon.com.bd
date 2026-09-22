import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';
import { ShippingMethodVO } from '../primitives/shipping-method.vo';
import { PayoutAmountVO } from '../primitives/payout-amount.vo';

export interface VendorShippingProps {
  readonly vendorId: VendorIdVO;
  readonly methods: ReadonlyArray<ShippingMethodVO>;
  readonly freeShippingThreshold: PayoutAmountVO | null;
  readonly defaultShippingCost: PayoutAmountVO;
  readonly shipsInternationally: boolean;
}

export class VendorShippingVO extends BaseVO<VendorShippingProps> {
  private constructor(props: VendorShippingProps) {
    super(Object.freeze({
      ...props,
      methods: Object.freeze([...props.methods]),
    }));
  }

  static create(props: VendorShippingProps): VendorShippingVO {
    return new VendorShippingVO(props);
  }

  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get methods(): ReadonlyArray<ShippingMethodVO> { return this.value.methods; }
  get freeShippingThreshold(): PayoutAmountVO | null { return this.value.freeShippingThreshold; }
  get defaultShippingCost(): PayoutAmountVO { return this.value.defaultShippingCost; }
  get shipsInternationally(): boolean { return this.value.shipsInternationally; }
}
