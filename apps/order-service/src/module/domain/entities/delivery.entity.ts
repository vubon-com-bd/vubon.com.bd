/**
 * DeliveryEntity — AGGREGATE ROOT
 * @module order-service/domain/entities
 *
 * State machine:
 *   pending → scheduled → picked_up → in_transit → out_for_delivery → delivered
 *   Any pre-delivered → failed | cancelled
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeliveryVO } from '../value-objects/composites/delivery.vo.js';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo.js';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo.js';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

import {
  DeliveryScheduledEvent,
  DeliveryRescheduledEvent,
  DeliveryStatusChangedEvent,
  DeliveryDeliveredEvent,
  DeliveryFailedEvent,
} from '../events/delivery.events.js';

export interface DeliveryEntityProps {
  readonly vo: DeliveryVO;
}

export class DeliveryEntity extends AggregateRoot<string> {
  private _vo: DeliveryVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeliveryEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._vo.isDelivered() && !this._vo.deliveredAt) {
      throw new ValidationError('Delivered status requires deliveredAt', 'deliveredAt');
    }
  }

  // ═══ Getters ═══
  get vo(): DeliveryVO { return this._vo; }
  get orderId(): OrderIdVO { return this._vo.orderId; }
  get methodId(): DeliveryMethodIdVO { return this._vo.methodId; }
  get status(): DeliveryStatusVO { return this._vo.status; }
  get trackingNumber(): TrackingNumberVO | undefined { return this._vo.trackingNumber; }
  get attempts(): number { return this._vo.attempts; }
  get estimatedAt(): string | undefined { return this._vo.estimatedAt; }
  get deliveredAt(): string | undefined { return this._vo.deliveredAt; }

  // ═══ Predicates ═══
  isPending(): boolean { return this.status.isPending(); }
  isScheduled(): boolean { return this.status.isScheduled(); }
  isPickedUp(): boolean { return this.status.isPickedUp(); }
  isInTransit(): boolean { return this.status.isInTransit(); }
  isOutForDelivery(): boolean { return this.status.isOutForDelivery(); }
  isDelivered(): boolean { return this.status.isDelivered(); }
  isFailed(): boolean { return this.status.isFailed(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  canRetry(): boolean { return this._vo.canRetry(); }

  // ═══ Business Actions ═══
  schedule(
    trackingNumber: TrackingNumberVO | undefined,
    courierId: string | undefined,
    estimatedAt: string | undefined,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('scheduled');
    const from = this.status.value;
    this._vo = DeliveryVO.create({
      ...this._vo.value,
      status: DeliveryStatusVO.create('scheduled'),
      trackingNumber: trackingNumber ?? this._vo.trackingNumber,
      courierId: courierId ?? this._vo.courierId,
      estimatedAt: estimatedAt ?? this._vo.estimatedAt,
    });
    this.addDomainEvent(
      new DeliveryScheduledEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          orderId: this.orderId.value,
          methodId: this.methodId.value,
          type: this._vo.type.value,
          estimatedAt: this._vo.estimatedAt,
        },
        version: this.version + 1,
      }),
    );
    this.emitStatusChange(from, 'scheduled');
    this.touch(now);
    this.incrementVersion();
  }

  reschedule(reason: string, newEstimatedAt?: string, now: string = new Date().toISOString()): void {
    if (this.isTerminal()) {
      throw new BusinessRuleError(
        `Cannot reschedule delivery in status "${this.status.value}"`,
        'DELIVERY_CANNOT_BE_RESCHEDULED',
        { deliveryId: this.id, status: this.status.value },
      );
    }
    this._vo = DeliveryVO.create({
      ...this._vo.value,
      estimatedAt: newEstimatedAt ?? this._vo.estimatedAt,
    });
    this.addDomainEvent(
      new DeliveryRescheduledEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this.orderId.value, reason, newEstimatedAt },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pickUp(now: string = new Date().toISOString()): void {
    this.transitionTo('picked_up', now);
  }

  markInTransit(now: string = new Date().toISOString()): void {
    this.transitionTo('in_transit', now);
  }

  markOutForDelivery(now: string = new Date().toISOString()): void {
    this.transitionTo('out_for_delivery', now);
  }

  markDelivered(
    receivedBy?: string,
    signature?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('delivered');
    const from = this.status.value;
    this._vo = DeliveryVO.create({
      ...this._vo.value,
      status: DeliveryStatusVO.delivered(),
      deliveredAt: now,
    });
    this.addDomainEvent(
      new DeliveryDeliveredEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          orderId: this.orderId.value,
          deliveredAt: now,
          receivedBy,
          signature,
        },
        version: this.version + 1,
      }),
    );
    this.emitStatusChange(from, 'delivered');
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    const from = this.status.value;
    const newAttempts = this._vo.attempts + 1;
    this._vo = DeliveryVO.create({
      ...this._vo.value,
      status: DeliveryStatusVO.create('failed'),
      attempts: newAttempts,
    });
    this.addDomainEvent(
      new DeliveryFailedEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          orderId: this.orderId.value,
          reason,
          attempts: newAttempts,
        },
        version: this.version + 1,
      }),
    );
    this.emitStatusChange(from, 'failed');
    this.touch(now);
    this.incrementVersion();
  }

  cancel(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    const from = this.status.value;
    this._vo = DeliveryVO.create({
      ...this._vo.value,
      status: DeliveryStatusVO.create('cancelled'),
    });
    this.emitStatusChange(from, 'cancelled');
    this.touch(now);
    this.incrementVersion();
  }

  // ═══ Private Helpers ═══
  private transitionTo(target: string, now: string): void {
    this.assertTransitionTo(target);
    const from = this.status.value;
    this._vo = DeliveryVO.create({
      ...this._vo.value,
      status: DeliveryStatusVO.create(target),
    });
    this.emitStatusChange(from, target);
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid delivery status transition: "${this.status.value}" → "${target}"`,
        'INVALID_DELIVERY_STATUS_TRANSITION',
        { from: this.status.value, to: target, deliveryId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, changedBy?: string): void {
    this.addDomainEvent(
      new DeliveryStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          orderId: this.orderId.value,
          fromStatus: from,
          toStatus: to,
          changedBy,
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══ Factories ═══
  static create(params: {
    id: string;
    vo: DeliveryVO;
    now: string;
  }): DeliveryEntity {
    if (!params.vo.status.isPending()) {
      throw new ValidationError('New delivery must be in pending status', 'status');
    }
    return new DeliveryEntity(params.id, params.now, params.now, { vo: params.vo }, null);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: DeliveryEntityProps;
    version?: number;
  }): DeliveryEntity {
    const entity = new DeliveryEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
