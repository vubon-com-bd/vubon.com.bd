/**
 * OrderFulfillmentVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { FulfillmentIdVO } from '../primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '../primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';

export interface OrderFulfillmentVOProps {
  readonly id: FulfillmentIdVO;
  readonly orderId: OrderIdVO;
  readonly vendorId?: VendorIdVO;
  readonly status: FulfillmentStatusVO;
  readonly itemIds: readonly string[];
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly warehouseId?: string;
  readonly fulfilledAt?: string;
  readonly deliveredAt?: string;
}

export class OrderFulfillmentVO extends BaseVO<OrderFulfillmentVOProps> {
  private constructor(props: OrderFulfillmentVOProps) {
    super(props);
    Object.freeze(this);
  }

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
    if (!Array.isArray(v.itemIds) || v.itemIds.length === 0) {
      throw new ValidationError('Fulfillment must have at least one item', 'itemIds');
    }
    if (v.status.isFulfilled() && !v.fulfilledAt) {
      throw new ValidationError('Fulfilled status requires fulfilledAt', 'fulfilledAt');
    }
  }

  // ═══ Getters ═══
  get id(): FulfillmentIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get vendorId(): VendorIdVO | undefined { return this.value.vendorId; }
  get status(): FulfillmentStatusVO { return this.value.status; }
  get itemIds(): readonly string[] { return this.value.itemIds; }
  get trackingNumber(): string | undefined { return this.value.trackingNumber; }
  get courierId(): string | undefined { return this.value.courierId; }
  get warehouseId(): string | undefined { return this.value.warehouseId; }
  get fulfilledAt(): string | undefined { return this.value.fulfilledAt; }
  get deliveredAt(): string | undefined { return this.value.deliveredAt; }

  // ═══ Business methods ═══
  isFulfilled(): boolean { return this.status.isFulfilled(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  hasTracking(): boolean { return this.trackingNumber !== undefined; }
  get itemCount(): number { return this.itemIds.length; }
}
