/**
 * OrderFulfillmentVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FulfillmentIdVO } from '../primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '../primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { OrderItemIdVO } from '../primitives/order-item-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { TrackingNumberVO } from '../primitives/tracking-number.vo.js';

export interface OrderFulfillmentVOProps {
  readonly id: FulfillmentIdVO;
  readonly orderId: OrderIdVO;
  readonly vendorId?: VendorIdVO;
  readonly status: FulfillmentStatusVO;
  readonly type: string;
  readonly itemIds: readonly OrderItemIdVO[];
  readonly trackingNumber?: TrackingNumberVO;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly shippingCost?: number;
  readonly currency: string;
  readonly fulfilledAt?: string;
  readonly deliveredAt?: string;
  readonly notes?: string;
}

export class OrderFulfillmentVO extends BaseVO<OrderFulfillmentVOProps> {
  private constructor(props: OrderFulfillmentVOProps) { super(props); }

  static create(props: OrderFulfillmentVOProps): OrderFulfillmentVO {
    const vo = new OrderFulfillmentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderFulfillmentVOProps): OrderFulfillmentVO {
    return new OrderFulfillmentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.itemIds.length === 0) {
      throw new ValidationError('Fulfillment must reference at least one item', 'itemIds');
    }
    if (v.itemIds.length > 50) {
      throw new ValidationError('Fulfillment cannot have more than 50 items', 'itemIds');
    }
    if (v.shippingCost !== undefined && v.shippingCost < 0) {
      throw new ValidationError('Shipping cost cannot be negative', 'shippingCost');
    }
    if (v.currency.length !== 3) {
      throw new ValidationError('Currency must be 3-char code', 'currency');
    }
  }

  get id(): FulfillmentIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get vendorId(): VendorIdVO | undefined { return this.value.vendorId; }
  get status(): FulfillmentStatusVO { return this.value.status; }
  get type(): string { return this.value.type; }
  get itemIds(): readonly OrderItemIdVO[] { return this.value.itemIds; }
  get trackingNumber(): TrackingNumberVO | undefined { return this.value.trackingNumber; }
  get courierId(): string | undefined { return this.value.courierId; }
  get warehouseId(): string | undefined { return this.value.warehouseId; }
  get shippingCost(): number | undefined { return this.value.shippingCost; }
  get currency(): string { return this.value.currency; }
  get fulfilledAt(): string | undefined { return this.value.fulfilledAt; }
  get deliveredAt(): string | undefined { return this.value.deliveredAt; }
  get notes(): string | undefined { return this.value.notes; }

  get itemCount(): number {
    return this.itemIds.length;
  }

  isComplete(): boolean {
    return this.status.isFulfilled();
  }

  hasTracking(): boolean {
    return this.trackingNumber !== undefined;
  }

  isPartial(): boolean {
    return this.status.isPartiallyFulfilled();
  }
}
