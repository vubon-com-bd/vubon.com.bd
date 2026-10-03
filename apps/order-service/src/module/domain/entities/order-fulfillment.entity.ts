/**
 * OrderFulfillmentEntity — aggregate root for fulfillment
 * @module order-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_FULFILLMENT, ORDER_FULFILLMENT_STATUS } from '@vubon/shared-constants/business/order';
import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../value-objects/primitives/order-item-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';
import {
  FulfillmentStartedEvent,
  FulfillmentPackedEvent,
  FulfillmentShippedEvent,
  FulfillmentPartiallyFulfilledEvent,
  FulfillmentCompletedEvent,
  FulfillmentCancelledEvent,
} from '../events/order-fulfillment.events.js';

export interface OrderFulfillmentEntityProps {
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

export class OrderFulfillmentEntity extends AggregateRoot<string> {
  private _status: FulfillmentStatusVO;
  private _trackingNumber?: TrackingNumberVO;
  private _courierId?: string;
  private _fulfilledAt?: string;
  private _deliveredAt?: string;
  private _notes?: string;

  private readonly _orderId: OrderIdVO;
  private readonly _vendorId?: VendorIdVO;
  private readonly _type: string;
  private readonly _itemIds: readonly OrderItemIdVO[];
  private readonly _warehouseId?: string;
  private readonly _shippingCost?: number;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderFulfillmentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._vendorId = props.vendorId;
    this._status = props.status;
    this._type = props.type;
    this._itemIds = props.itemIds;
    this._trackingNumber = props.trackingNumber;
    this._courierId = props.courierId;
    this._warehouseId = props.warehouseId;
    this._shippingCost = props.shippingCost;
    this._currency = props.currency;
    this._fulfilledAt = props.fulfilledAt;
    this._deliveredAt = props.deliveredAt;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._itemIds.length === 0) {
      throw new ValidationError('Fulfillment must reference at least one item', 'itemIds');
    }
    if (this._itemIds.length > ORDER_FULFILLMENT.MAX_ITEMS_PER_SHIPMENT) {
      throw new ValidationError(
        `Cannot exceed ${ORDER_FULFILLMENT.MAX_ITEMS_PER_SHIPMENT} items`,
        'itemIds',
      );
    }
  }

  get toIdVO(): FulfillmentIdVO { return FulfillmentIdVO.reconstitute(this.id); }
  get orderId(): OrderIdVO { return this._orderId; }
  get vendorId(): VendorIdVO | undefined { return this._vendorId; }
  get status(): FulfillmentStatusVO { return this._status; }
  get type(): string { return this._type; }
  get itemIds(): readonly OrderItemIdVO[] { return this._itemIds; }
  get trackingNumber(): TrackingNumberVO | undefined { return this._trackingNumber; }
  get courierId(): string | undefined { return this._courierId; }
  get warehouseId(): string | undefined { return this._warehouseId; }
  get shippingCost(): number | undefined { return this._shippingCost; }
  get currency(): string { return this._currency; }
  get fulfilledAt(): string | undefined { return this._fulfilledAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get notes(): string | undefined { return this._notes; }
  get itemCount(): number { return this._itemIds.length; }

  pack(packageCount: number | undefined, now: string): void {
    if (
      !this._status.isUnfulfilled() &&
      !this._status.isPending() &&
      !this._status.isPartiallyFulfilled()
    ) {
      throw new BusinessRuleError(`Cannot pack in status "${this._status.value}"`, 'INVALID_STATUS');
    }
    this.addDomainEvent(
      new FulfillmentPackedEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, orderId: this._orderId.value, packedAt: now, packageCount },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  ship(trackingNumber: TrackingNumberVO | undefined, courierId: string | undefined, now: string): void {
    this._trackingNumber = trackingNumber;
    if (courierId) this._courierId = courierId;
    this.addDomainEvent(
      new FulfillmentShippedEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, orderId: this._orderId.value, shippedAt: now, trackingNumber: trackingNumber?.value, courierId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPartiallyFulfilled(fulfilledItemCount: number, pendingItemCount: number, now: string): void {
    this._status = FulfillmentStatusVO.create(ORDER_FULFILLMENT_STATUS.PARTIALLY_FULFILLED);
    this.addDomainEvent(
      new FulfillmentPartiallyFulfilledEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, orderId: this._orderId.value, fulfilledItemCount, pendingItemCount },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string): void {
    if (this._status.isFulfilled()) return;
    this._status = FulfillmentStatusVO.create(ORDER_FULFILLMENT_STATUS.FULFILLED);
    this._fulfilledAt = now;
    this.addDomainEvent(
      new FulfillmentCompletedEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, orderId: this._orderId.value, completedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(now: string): void {
    this._deliveredAt = now;
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, now: string): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(`Already in final status "${this._status.value}"`, 'INVALID_STATUS');
    }
    this._status = FulfillmentStatusVO.create(ORDER_FULFILLMENT_STATUS.CANCELLED);
    this.addDomainEvent(
      new FulfillmentCancelledEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, orderId: this._orderId.value, cancelledAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  isComplete(): boolean { return this._status.isFulfilled(); }
  isPartial(): boolean { return this._status.isPartiallyFulfilled(); }

  hasTracking(): boolean { return this._trackingNumber !== undefined; }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: OrderFulfillmentEntityProps;
    now: string;
  }): OrderFulfillmentEntity {
    const entity = new OrderFulfillmentEntity(params.id, params.now, params.now, params.props);
    entity.addDomainEvent(
      new FulfillmentStartedEvent({
        aggregateId: params.id,
        payload: {
          fulfillmentId: params.id,
          orderId: params.props.orderId.value,
          type: params.props.type,
          itemIds: params.props.itemIds.map((i) => i.value),
          vendorId: params.props.vendorId?.value,
          warehouseId: params.props.warehouseId,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: OrderFulfillmentEntityProps;
    version?: number;
  }): OrderFulfillmentEntity {
    const entity = new OrderFulfillmentEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
