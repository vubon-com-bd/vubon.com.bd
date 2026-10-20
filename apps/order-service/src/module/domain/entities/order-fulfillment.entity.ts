/**
 * OrderFulfillmentEntity — Child of Order aggregate
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

import { OrderFulfillmentVO } from '../value-objects/composites/order-fulfillment.vo.js';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo.js';

export class OrderFulfillmentEntity extends BaseEntity<string> {
  private _vo: OrderFulfillmentVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: OrderFulfillmentVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters ═══
  get vo(): OrderFulfillmentVO { return this._vo; }
  get orderId(): OrderFulfillmentVO['orderId'] { return this._vo.orderId; }
  get status(): FulfillmentStatusVO { return this._vo.status; }
  get itemIds(): readonly string[] { return this._vo.itemIds; }

  // ═══ Predicates ═══
  isUnfulfilled(): boolean { return this.status.isUnfulfilled(); }
  isFulfilled(): boolean { return this.status.isFulfilled(); }
  isTerminal(): boolean { return this.status.isTerminal(); }

  // ═══ Business methods ═══
  start(now: string = new Date().toISOString()): void {
    this.transitionTo('pending', now);
  }

  markPartiallyFulfilled(now: string = new Date().toISOString()): void {
    this.transitionTo('partially_fulfilled', now);
  }

  fulfill(trackingNumber?: string, now: string = new Date().toISOString()): void {
    if (!this.status.canTransitionTo('fulfilled')) {
      throw new BusinessRuleError(
        `Cannot fulfill in status "${this.status.value}"`,
        'INVALID_FULFILLMENT_STATUS_TRANSITION',
        { from: this.status.value, to: 'fulfilled', fulfillmentId: this.id },
      );
    }
    this._vo = OrderFulfillmentVO.create({
      ...this._vo.value,
      status: FulfillmentStatusVO.create('fulfilled'),
      trackingNumber: trackingNumber ?? this._vo.trackingNumber,
      fulfilledAt: now,
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  restock(now: string = new Date().toISOString()): void {
    this.transitionTo('restocked', now);
  }

  cancel(now: string = new Date().toISOString()): void {
    this.transitionTo('cancelled', now);
  }

  // ═══ Private Helpers ═══
  private transitionTo(target: string, now: string): void {
    if (!this.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid fulfillment status transition: "${this.status.value}" → "${target}"`,
        'INVALID_FULFILLMENT_STATUS_TRANSITION',
        { from: this.status.value, to: target, fulfillmentId: this.id },
      );
    }
    this._vo = OrderFulfillmentVO.create({
      ...this._vo.value,
      status: FulfillmentStatusVO.create(target),
    });
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: OrderFulfillmentVO;
    now: string;
  }): OrderFulfillmentEntity {
    return new OrderFulfillmentEntity(params.id, params.now, params.now, params.vo, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: OrderFulfillmentVO;
  }): OrderFulfillmentEntity {
    return new OrderFulfillmentEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
