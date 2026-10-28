/**
 * OrderTrackingEntity — Child of Order aggregate (append-only events)
 * @module order-service/domain/entities
 *
 * ⚠️ BaseEntity-তে version নেই।
 * ⚠️ Append-only — new tracking events are added, not modified.
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';

import { OrderTrackingVO } from '../value-objects/composites/order-tracking.vo.js';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo.js';
import { OrderTrackingUpdatedEvent } from '../events/order-tracking.events.js';

export class OrderTrackingEntity extends AggregateRoot<string> {
  private readonly _vo: OrderTrackingVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    vo: OrderTrackingVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = vo;
  }

  // ═══ Getters (read-only) ═══
  get vo(): OrderTrackingVO { return this._vo; }
  get orderId(): OrderTrackingVO['orderId'] { return this._vo.orderId; }
  get status(): TrackingStatusVO { return this._vo.status; }
  get trackingNumber(): OrderTrackingVO['trackingNumber'] { return this._vo.trackingNumber; }
  get message(): string { return this._vo.message; }
  get occurredAt(): string { return this._vo.occurredAt; }

  // ═══ Predicates ═══
  isTerminal(): boolean { return this._vo.isTerminal(); }
  hasLocation(): boolean { return this._vo.hasLocation(); }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: OrderTrackingVO;
    now: string;
  }): OrderTrackingEntity {
    const entity = new OrderTrackingEntity(params.id, params.now, params.now, params.vo, null);
    entity.addDomainEvent(
      new OrderTrackingUpdatedEvent({
        aggregateId: params.id,
        payload: {
          trackingId: params.id,
          orderId: params.vo.orderId.value,
          status: params.vo.status.value,
          message: params.vo.message,
          occurredAt: params.vo.occurredAt,
        },
      }),
    );
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    vo: OrderTrackingVO;
  }): OrderTrackingEntity {
    return new OrderTrackingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.vo,
      params.deletedAt ?? null,
    );
  }
}
