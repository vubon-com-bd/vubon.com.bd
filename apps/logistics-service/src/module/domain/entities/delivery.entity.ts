/**
 * DeliveryEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   scheduled → assigned → picked_up → in_transit → out_for_delivery
 *   → arrived → delivered ✓ (final)
 *   any (except final) → failed
 *   failed → rescheduled → scheduled
 *   any (except final) → cancelled | refused
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DELIVERY } from '@vubon/shared-constants/logistics';

import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../value-objects/primitives/delivery-type.vo.js';
import { DeliveryWindowVO } from '../value-objects/primitives/delivery-window.vo.js';

import {
  DeliveryCreatedEvent,
  DeliveryScheduledEvent,
  DeliveryAssignedEvent,
  DeliveryPickedUpEvent,
  DeliveryInTransitEvent,
  DeliveryOutForDeliveryEvent,
  DeliveryArrivedEvent,
  DeliveryDeliveredEvent,
  DeliveryFailedEvent,
  DeliveryRescheduledEvent,
  DeliveryCancelledEvent,
  DeliveryRefusedEvent,
  DeliveryStatusChangedEvent,
} from '../events/delivery.events.js';

export interface DeliveryEntityProps {
  readonly shipmentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly window?: DeliveryWindowVO;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly recipientName?: string;
  readonly recipientPhone?: string;
  readonly deliveryAddress: string;
  readonly scheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly inTransitAt?: string;
  readonly outForDeliveryAt?: string;
  readonly arrivedAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly refusedAt?: string;
  readonly rescheduledAt?: string;
  readonly attemptCount: number;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly refusedReason?: string;
  readonly notes?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class DeliveryEntity extends AggregateRoot<string> {
  private _status: DeliveryStatusVO;
  private _window?: DeliveryWindowVO;
  private _driverId?: string;
  private _vehicleId?: string;
  private _routeId?: string;
  private _recipientName?: string;
  private _recipientPhone?: string;
  private _scheduledAt?: string;
  private _pickedUpAt?: string;
  private _inTransitAt?: string;
  private _outForDeliveryAt?: string;
  private _arrivedAt?: string;
  private _deliveredAt?: string;
  private _failedAt?: string;
  private _cancelledAt?: string;
  private _refusedAt?: string;
  private _rescheduledAt?: string;
  private _attemptCount: number;
  private _failureReason?: string;
  private _cancelReason?: string;
  private _refusedReason?: string;
  private _notes?: string;

  private readonly _shipmentId: string;
  private readonly _orderId: string;
  private readonly _userId?: string;
  private readonly _type: DeliveryTypeVO;
  private readonly _deliveryAddress: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DeliveryEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentId = props.shipmentId;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._status = props.status;
    this._type = props.type;
    this._window = props.window;
    this._driverId = props.driverId;
    this._vehicleId = props.vehicleId;
    this._routeId = props.routeId;
    this._recipientName = props.recipientName;
    this._recipientPhone = props.recipientPhone;
    this._deliveryAddress = props.deliveryAddress;
    this._scheduledAt = props.scheduledAt;
    this._pickedUpAt = props.pickedUpAt;
    this._inTransitAt = props.inTransitAt;
    this._outForDeliveryAt = props.outForDeliveryAt;
    this._arrivedAt = props.arrivedAt;
    this._deliveredAt = props.deliveredAt;
    this._failedAt = props.failedAt;
    this._cancelledAt = props.cancelledAt;
    this._refusedAt = props.refusedAt;
    this._rescheduledAt = props.rescheduledAt;
    this._attemptCount = props.attemptCount;
    this._failureReason = props.failureReason;
    this._cancelReason = props.cancelReason;
    this._refusedReason = props.refusedReason;
    this._notes = props.notes;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._shipmentId) throw new ValidationError('Shipment ID required', 'shipmentId');
    if (!this._orderId) throw new ValidationError('Order ID required', 'orderId');
    if (!this._deliveryAddress || this._deliveryAddress.trim().length === 0) {
      throw new ValidationError('Delivery address required', 'deliveryAddress');
    }
    if (this._attemptCount < 0) {
      throw new ValidationError('Attempt count cannot be negative', 'attemptCount');
    }
    if (this._attemptCount > DELIVERY.MAX_ATTEMPTS) {
      throw new ValidationError(
        `Attempt count ${this._attemptCount} exceeds max ${DELIVERY.MAX_ATTEMPTS}`,
        'attemptCount',
      );
    }
  }

  get shipmentId(): string { return this._shipmentId; }
  get orderId(): string { return this._orderId; }
  get userId(): string | undefined { return this._userId; }
  get status(): DeliveryStatusVO { return this._status; }
  get type(): DeliveryTypeVO { return this._type; }
  get window(): DeliveryWindowVO | undefined { return this._window; }
  get driverId(): string | undefined { return this._driverId; }
  get vehicleId(): string | undefined { return this._vehicleId; }
  get routeId(): string | undefined { return this._routeId; }
  get recipientName(): string | undefined { return this._recipientName; }
  get recipientPhone(): string | undefined { return this._recipientPhone; }
  get deliveryAddress(): string { return this._deliveryAddress; }
  get scheduledAt(): string | undefined { return this._scheduledAt; }
  get pickedUpAt(): string | undefined { return this._pickedUpAt; }
  get inTransitAt(): string | undefined { return this._inTransitAt; }
  get outForDeliveryAt(): string | undefined { return this._outForDeliveryAt; }
  get arrivedAt(): string | undefined { return this._arrivedAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get refusedAt(): string | undefined { return this._refusedAt; }
  get rescheduledAt(): string | undefined { return this._rescheduledAt; }
  get attemptCount(): number { return this._attemptCount; }
  get failureReason(): string | undefined { return this._failureReason; }
  get cancelReason(): string | undefined { return this._cancelReason; }
  get refusedReason(): string | undefined { return this._refusedReason; }
  get notes(): string | undefined { return this._notes; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): DeliveryIdVO { return DeliveryIdVO.reconstitute(this.id); }

  isScheduled(): boolean { return this._status.isScheduled(); }
  isAssigned(): boolean { return this._status.isAssigned(); }
  isPickedUp(): boolean { return this._status.isPickedUp(); }
  isInTransit(): boolean { return this._status.isInTransit(); }
  isOutForDelivery(): boolean { return this._status.isOutForDelivery(); }
  isArrived(): boolean { return this._status.isArrived(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isRescheduled(): boolean { return this._status.isRescheduled(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isRefused(): boolean { return this._status.isRefused(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isInMotion(): boolean { return this._status.isInMotion(); }

  hasDriver(): boolean { return !!this._driverId; }
  hasWindow(): boolean { return !!this._window; }
  canAttemptAgain(): boolean { return this._attemptCount < DELIVERY.MAX_ATTEMPTS; }

  // ═══ Business Actions ═══
  schedule(window?: DeliveryWindowVO, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('scheduled');
    const from = this._status.value;
    this._status = DeliveryStatusVO.scheduled();
    this._window = window;
    this._scheduledAt = now;
    this.emitStatusChange(from, 'scheduled');
    this.addDomainEvent(
      new DeliveryScheduledEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          scheduledAt: now,
          windowStart: window?.startAt,
          windowEnd: window?.endAt,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  assign(
    driverId: string,
    vehicleId?: string,
    routeId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('assigned');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('assigned');
    this._driverId = driverId;
    this._vehicleId = vehicleId;
    this._routeId = routeId;
    this.emitStatusChange(from, 'assigned');
    this.addDomainEvent(
      new DeliveryAssignedEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          driverId,
          vehicleId,
          routeId,
          assignedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pickUp(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('picked_up');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('picked_up');
    this._pickedUpAt = now;
    this.emitStatusChange(from, 'picked_up');
    this.addDomainEvent(
      new DeliveryPickedUpEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, pickedUpAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startTransit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('in_transit');
    this._inTransitAt = now;
    this.emitStatusChange(from, 'in_transit');
    this.addDomainEvent(
      new DeliveryInTransitEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, inTransitAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  outForDelivery(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('out_for_delivery');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('out_for_delivery');
    this._outForDeliveryAt = now;
    this.emitStatusChange(from, 'out_for_delivery');
    this.addDomainEvent(
      new DeliveryOutForDeliveryEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, outForDeliveryAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  arrive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('arrived');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('arrived');
    this._arrivedAt = now;
    this.emitStatusChange(from, 'arrived');
    this.addDomainEvent(
      new DeliveryArrivedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, arrivedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(
    recipientName?: string,
    signedBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('delivered');
    const from = this._status.value;
    this._status = DeliveryStatusVO.delivered();
    this._deliveredAt = now;
    if (recipientName) this._recipientName = recipientName;
    this.emitStatusChange(from, 'delivered');
    this.addDomainEvent(
      new DeliveryDeliveredEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, deliveredAt: now, recipientName, signedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._attemptCount += 1;
    this._status = DeliveryStatusVO.create('failed');
    this._failedAt = now;
    this._failureReason = reason;
    this.emitStatusChange(from, 'failed', reason);
    this.addDomainEvent(
      new DeliveryFailedEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          failedAt: now,
          reason,
          attemptNumber: this._attemptCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reschedule(
    newWindow?: DeliveryWindowVO,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('rescheduled');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('rescheduled');
    this._rescheduledAt = now;
    if (newWindow) this._window = newWindow;
    this.emitStatusChange(from, 'rescheduled');
    this.addDomainEvent(
      new DeliveryRescheduledEvent({
        aggregateId: this.id,
        payload: {
          deliveryId: this.id,
          rescheduledAt: now,
          newWindowStart: newWindow?.startAt,
          newWindowEnd: newWindow?.endAt,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('cancelled');
    this._cancelledAt = now;
    this._cancelReason = reason;
    this.emitStatusChange(from, 'cancelled', reason);
    this.addDomainEvent(
      new DeliveryCancelledEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, cancelledAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markRefused(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('refused');
    const from = this._status.value;
    this._status = DeliveryStatusVO.create('refused');
    this._refusedAt = now;
    this._refusedReason = reason;
    this.emitStatusChange(from, 'refused', reason);
    this.addDomainEvent(
      new DeliveryRefusedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, refusedAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid delivery status transition: "${this._status.value}" → "${target}"`,
        'INVALID_DELIVERY_STATUS_TRANSITION',
        { from: this._status.value, to: target, deliveryId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new DeliveryStatusChangedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: DeliveryIdVO;
    props: Omit<DeliveryEntityProps, 'status'>;
    now: string;
  }): DeliveryEntity {
    const entity = new DeliveryEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: DeliveryStatusVO.scheduled() },
    );
    entity.addDomainEvent(
      new DeliveryCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          deliveryId: params.id.value,
          shipmentId: params.props.shipmentId,
          orderId: params.props.orderId,
          type: params.props.type.value,
          createdAt: params.now,
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
