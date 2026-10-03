/**
 * DeliveryEntity — aggregate root for shipping delivery
 * @module order-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DELIVERY, DELIVERY_STATUS } from '@vubon/shared-constants/logistics';
import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../value-objects/primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '../value-objects/primitives/delivery-method-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import {
  DeliveryScheduledEvent,
  DeliveryRescheduledEvent,
  DeliveryAssignedEvent,
  DeliveryPickedUpEvent,
  DeliveryInTransitEvent,
  DeliveryOutForDeliveryEvent,
  DeliveryAttemptedEvent,
  DeliveryCompletedEvent,
  DeliveryFailedEvent,
  DeliveryCancelledEvent,
} from '../events/delivery.events.js';

export interface DeliveryEntityProps {
  readonly orderId: OrderIdVO;
  readonly methodId?: DeliveryMethodIdVO;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly trackingNumber?: string;
  readonly courierId?: string;
  readonly estimatedAt?: string;
  readonly deliveredAt?: string;
  readonly attempts: number;
  readonly notes?: string;
}

export class DeliveryEntity extends AggregateRoot<string> {
  private _status: DeliveryStatusVO;
  private _trackingNumber?: string;
  private _courierId?: string;
  private _estimatedAt?: string;
  private _deliveredAt?: string;
  private _attempts: number;
  private _notes?: string;

  private readonly _orderId: OrderIdVO;
  private readonly _methodId?: DeliveryMethodIdVO;
  private readonly _type: DeliveryTypeVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeliveryEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._methodId = props.methodId;
    this._status = props.status;
    this._type = props.type;
    this._trackingNumber = props.trackingNumber;
    this._courierId = props.courierId;
    this._estimatedAt = props.estimatedAt;
    this._deliveredAt = props.deliveredAt;
    this._attempts = props.attempts;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._attempts < 0 || this._attempts > DELIVERY.MAX_ATTEMPTS * 2) {
      throw new ValidationError(`Attempts must be 0-${DELIVERY.MAX_ATTEMPTS * 2}`, 'attempts');
    }
    if (this._status.isDelivered() && !this._deliveredAt) {
      throw new ValidationError('Delivered status requires deliveredAt', 'deliveredAt');
    }
  }

  get toIdVO(): DeliveryIdVO { return DeliveryIdVO.reconstitute(this.id); }
  get orderId(): OrderIdVO { return this._orderId; }
  get methodId(): DeliveryMethodIdVO | undefined { return this._methodId; }
  get status(): DeliveryStatusVO { return this._status; }
  get type(): DeliveryTypeVO { return this._type; }
  get trackingNumber(): string | undefined { return this._trackingNumber; }
  get courierId(): string | undefined { return this._courierId; }
  get estimatedAt(): string | undefined { return this._estimatedAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get attempts(): number { return this._attempts; }
  get notes(): string | undefined { return this._notes; }

  isInTransit(): boolean { return this._status.isInTransit() || this._status.isOutForDelivery(); }
  isComplete(): boolean { return this._status.isDelivered(); }
  isFailed(): boolean { return this._status.isFailed(); }

  assignCourier(courierId: string, now: string = new Date().toISOString()): void {
    if (!this._status.isScheduled()) {
      throw new BusinessRuleError(
        `Cannot assign courier in status "${this._status.value}"`,
        'INVALID_STATUS_FOR_ASSIGN',
      );
    }
    this._courierId = courierId;
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.ASSIGNED);
    this.addDomainEvent(
      new DeliveryAssignedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, courierId, assignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pickUp(trackingNumber: string | undefined, now: string = new Date().toISOString()): void {
    if (!this._courierId) {
      throw new BusinessRuleError('Assign courier first', 'NO_COURIER');
    }
    this._trackingNumber = trackingNumber;
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.PICKED_UP);
    this.addDomainEvent(
      new DeliveryPickedUpEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, pickedUpAt: now, trackingNumber },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markInTransit(location: string | undefined, now: string = new Date().toISOString()): void {
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.IN_TRANSIT);
    this.addDomainEvent(
      new DeliveryInTransitEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, inTransitAt: now, location },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markOutForDelivery(now: string = new Date().toISOString()): void {
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.OUT_FOR_DELIVERY);
    this.addDomainEvent(
      new DeliveryOutForDeliveryEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, outAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  recordAttempt(success: boolean, notes: string | undefined, now: string = new Date().toISOString()): void {
    this._attempts += 1;
    const status = success ? 'success' : 'failed';
    this.addDomainEvent(
      new DeliveryAttemptedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, attemptNumber: this._attempts, status, notes },
        version: this.version + 1,
      }),
    );
    if (success) {
      this._status = DeliveryStatusVO.create(DELIVERY_STATUS.DELIVERED);
      this._deliveredAt = now;
    } else if (this._attempts >= DELIVERY.MAX_ATTEMPTS) {
      this._status = DeliveryStatusVO.create(DELIVERY_STATUS.FAILED);
    }
    this.touch(now);
    this.incrementVersion();
  }

  deliver(receivedBy: string | undefined, now: string = new Date().toISOString()): void {
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.DELIVERED);
    this._deliveredAt = now;
    this.addDomainEvent(
      new DeliveryCompletedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, deliveredAt: now, receivedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this._attempts += 1;
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.FAILED);
    this.addDomainEvent(
      new DeliveryFailedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, reason, attemptNumber: this._attempts, failedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reschedule(reason: string, newEstimatedAt?: string, now: string = new Date().toISOString()): void {
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.RESCHEDULED);
    if (newEstimatedAt) this._estimatedAt = newEstimatedAt;
    this.addDomainEvent(
      new DeliveryRescheduledEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, reason, newEstimatedAt },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, now: string = new Date().toISOString()): void {
    if (this.isComplete()) {
      throw new BusinessRuleError('Cannot cancel completed delivery', 'ALREADY_DELIVERED');
    }
    this._status = DeliveryStatusVO.create(DELIVERY_STATUS.CANCELLED);
    this.addDomainEvent(
      new DeliveryCancelledEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, orderId: this._orderId.value, cancelledAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  canRetry(): boolean {
    return this.isFailed() && this._attempts < DELIVERY.MAX_ATTEMPTS;
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: DeliveryEntityProps;
    now: string;
  }): DeliveryEntity {
    const entity = new DeliveryEntity(params.id, params.now, params.now, params.props);
    entity.addDomainEvent(
      new DeliveryScheduledEvent({
        aggregateId: params.id,
        payload: {
          deliveryId: params.id,
          orderId: params.props.orderId.value,
          type: params.props.type.value,
          methodId: params.props.methodId?.value,
          estimatedAt: params.props.estimatedAt,
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
    props: DeliveryEntityProps;
    version?: number;
  }): DeliveryEntity {
    const entity = new DeliveryEntity(
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
