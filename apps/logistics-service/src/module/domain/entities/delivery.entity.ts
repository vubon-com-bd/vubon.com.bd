/**
 * DeliveryEntity — AGGREGATE ROOT (delivery lifecycle + attempt records)
 * @module logistics-service/domain/entities
 *
 * Business rules:
 *  - Max attempts = DELIVERY.MAX_ATTEMPTS (3)
 *  - markDelivered requires proof when config says so
 *  - Can only attempt from out_for_delivery/arrived
 *  - Cannot add attempt to final status
 *  - Reschedule only from failed/refused
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DELIVERY } from '@vubon/shared-constants/logistics';
import type { Phone } from '@vubon/shared-types/common';

import { DeliveryIdVO } from '../value-objects/primitives/delivery-id.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { RouteIdVO } from '../value-objects/primitives/route-id.vo.js';
import { NotesVO } from '../value-objects/primitives/notes.vo.js';
import { AttemptNumberVO } from '../value-objects/primitives/attempt-number.vo.js';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../value-objects/primitives/delivery-type.vo.js';
import { DeliveryAttemptStatusVO } from '../value-objects/primitives/delivery-attempt-status.vo.js';
import { AddressDetailsVO } from '../value-objects/composites/address-details.vo.js';
import { DeliveryAttemptVO } from '../value-objects/composites/delivery-attempt.vo.js';
import { ProofOfDeliveryVO } from '../value-objects/composites/proof-of-delivery.vo.js';

import {
  DeliveryScheduledEvent,
  DeliveryDriverAssignedEvent,
  DeliveryPickedUpEvent,
  DeliveryInTransitEvent,
  DeliveryOutForDeliveryEvent,
  DeliveryArrivedEvent,
  DeliveryAttemptAddedEvent,
  DeliveryDeliveredEvent,
  DeliveryFailedEvent,
  DeliveryRescheduledEvent,
  DeliveryRefusedEvent,
  DeliveryCancelledEvent,
  DeliveryProofCapturedEvent,
} from '../events/delivery.events.js';

import {
  InvalidDeliveryStatusTransitionError,
  DeliveryAttemptLimitExceededError,
  DeliveryProofRequiredError,
  DeliveryCannotBeRescheduledError,
} from '../errors/delivery.errors.js';

export interface DeliveryEntityProps {
  readonly shipmentId: ShipmentIdVO;
  readonly orderId: OrderIdVO;
  readonly userId?: UserIdVO;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly driverId?: DriverIdVO;
  readonly vehicleId?: VehicleIdVO;
  readonly routeId?: RouteIdVO;
  readonly recipientName?: string;
  readonly recipientPhone?: Phone;
  readonly deliveryAddress: AddressDetailsVO;
  readonly scheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly arrivedAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly attempts: readonly DeliveryAttemptVO[];
  readonly proofOfDelivery?: ProofOfDeliveryVO;
  readonly notes?: NotesVO;
}

export class DeliveryEntity extends AggregateRoot<string> {
  private _status: DeliveryStatusVO;
  private _driverId?: DriverIdVO;
  private _vehicleId?: VehicleIdVO;
  private _routeId?: RouteIdVO;
  private _scheduledAt?: string;
  private _pickedUpAt?: string;
  private _arrivedAt?: string;
  private _deliveredAt?: string;
  private _failedAt?: string;
  private _cancelledAt?: string;
  private _attempts: DeliveryAttemptVO[];
  private _proofOfDelivery?: ProofOfDeliveryVO;
  private _notes?: NotesVO;

  private readonly _shipmentId: ShipmentIdVO;
  private readonly _orderId: OrderIdVO;
  private readonly _userId?: UserIdVO;
  private readonly _type: DeliveryTypeVO;
  private readonly _recipientName?: string;
  private readonly _recipientPhone?: Phone;
  private readonly _deliveryAddress: AddressDetailsVO;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: DeliveryEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentId = props.shipmentId;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._status = props.status;
    this._type = props.type;
    this._driverId = props.driverId;
    this._vehicleId = props.vehicleId;
    this._routeId = props.routeId;
    this._recipientName = props.recipientName;
    this._recipientPhone = props.recipientPhone;
    this._deliveryAddress = props.deliveryAddress;
    this._scheduledAt = props.scheduledAt;
    this._pickedUpAt = props.pickedUpAt;
    this._arrivedAt = props.arrivedAt;
    this._deliveredAt = props.deliveredAt;
    this._failedAt = props.failedAt;
    this._cancelledAt = props.cancelledAt;
    this._attempts = [...props.attempts];
    this._proofOfDelivery = props.proofOfDelivery;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._attempts.length > DELIVERY.MAX_ATTEMPTS) {
      throw new ValidationError(`Attempts exceed max ${DELIVERY.MAX_ATTEMPTS}`, 'attempts');
    }
    const uniqueNumbers = new Set(this._attempts.map((a) => a.attemptNumber.value));
    if (uniqueNumbers.size !== this._attempts.length) {
      throw new ValidationError('Attempt numbers must be unique', 'attempts');
    }
    if (this._status.isDelivered() && !this._deliveredAt) {
      throw new ValidationError('Delivered status requires deliveredAt timestamp', 'deliveredAt');
    }
  }

  get shipmentId(): ShipmentIdVO { return this._shipmentId; }
  get orderId(): OrderIdVO { return this._orderId; }
  get userId(): UserIdVO | undefined { return this._userId; }
  get status(): DeliveryStatusVO { return this._status; }
  get type(): DeliveryTypeVO { return this._type; }
  get driverId(): DriverIdVO | undefined { return this._driverId; }
  get vehicleId(): VehicleIdVO | undefined { return this._vehicleId; }
  get routeId(): RouteIdVO | undefined { return this._routeId; }
  get recipientName(): string | undefined { return this._recipientName; }
  get recipientPhone(): Phone | undefined { return this._recipientPhone; }
  get deliveryAddress(): AddressDetailsVO { return this._deliveryAddress; }
  get scheduledAt(): string | undefined { return this._scheduledAt; }
  get pickedUpAt(): string | undefined { return this._pickedUpAt; }
  get arrivedAt(): string | undefined { return this._arrivedAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get attempts(): readonly DeliveryAttemptVO[] { return this._attempts; }
  get proofOfDelivery(): ProofOfDeliveryVO | undefined { return this._proofOfDelivery; }
  get notes(): NotesVO | undefined { return this._notes; }
  get toIdVO(): DeliveryIdVO { return DeliveryIdVO.reconstitute(this.id); }

  // ─── Predicates ───
  isScheduled(): boolean { return this._status.isScheduled(); }
  isAssigned(): boolean { return this._status.isAssigned(); }
  isPickedUp(): boolean { return this._status.isPickedUp(); }
  isInTransit(): boolean { return this._status.isInTransit(); }
  isOutForDelivery(): boolean { return this._status.isOutForDelivery(); }
  isArrived(): boolean { return this._status.isArrived(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isRescheduled(): boolean { return this._status.isRescheduled(); }
  isRefused(): boolean { return this._status.isRefused(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isFinal(): boolean { return this._status.isFinal(); }

  get attemptCount(): number { return this._attempts.length; }
  get remainingAttempts(): number { return DELIVERY.MAX_ATTEMPTS - this._attempts.length; }
  get hasDriver(): boolean { return this._driverId !== undefined; }
  get hasProof(): boolean { return this._proofOfDelivery !== undefined; }
  get lastAttempt(): DeliveryAttemptVO | undefined { return this._attempts[this._attempts.length - 1]; }

  canAddAttempt(): boolean {
    if (this.isFinal()) return false;
    if (!this.isOutForDelivery() && !this.isArrived()) return false;
    return this.remainingAttempts > 0;
  }

  canBeRescheduled(): boolean {
    return this._status.isRecoverable() || this.isScheduled();
  }

  canBeCancelled(): boolean {
    return !this.isFinal() && !this.isDelivered();
  }

  /** Driver can retry from current status (after a failed attempt). */
  canRetry(): boolean {
    return this.remainingAttempts > 0 && (this.isFailed() || this.isRescheduled() || this.isRefused());
  }

  get attemptSummary(): Readonly<{ success: number; failed: number; pending: number }> {
    let success = 0, failed = 0, pending = 0;
    for (const a of this._attempts) {
      if (a.wasSuccessful()) success++;
      else if (a.status.isFinal()) failed++;
      else pending++;
    }
    return { success, failed, pending };
  }

  // ─── Private helpers ───
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidDeliveryStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ─── Business methods ───
  assignDriver(
    driverId: DriverIdVO,
    vehicleId?: VehicleIdVO,
    routeId?: RouteIdVO,
    now: string = new Date().toISOString(),
  ): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot assign driver to delivery in status "${this._status.value}"`,
        'DELIVERY_CANNOT_BE_MODIFIED',
        { deliveryId: this.id, status: this._status.value },
      );
    }
    this._driverId = driverId;
    if (vehicleId) this._vehicleId = vehicleId;
    if (routeId) this._routeId = routeId;
    this.addDomainEvent(new DeliveryDriverAssignedEvent({
      aggregateId: this.id,
      payload: {
        deliveryId: this.id,
        driverId: driverId.value,
        vehicleId: vehicleId?.value,
        routeId: routeId?.value,
        assignedAt: now,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  schedule(at: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('scheduled');
    this._scheduledAt = at;
    this.touch(now);
    this.incrementVersion();
  }

  pickup(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('picked_up');
    const from = this._status.value;
    this._status = DeliveryStatusVO.pickedUp();
    this._pickedUpAt = now;
    this.addDomainEvent(new DeliveryPickedUpEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, fromStatus: from, toStatus: 'picked_up' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markInTransit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = DeliveryStatusVO.inTransit();
    this.addDomainEvent(new DeliveryInTransitEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, fromStatus: from, toStatus: 'in_transit' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markOutForDelivery(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('out_for_delivery');
    const from = this._status.value;
    this._status = DeliveryStatusVO.outForDelivery();
    this.addDomainEvent(new DeliveryOutForDeliveryEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, fromStatus: from, toStatus: 'out_for_delivery' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markArrived(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('arrived');
    const from = this._status.value;
    this._status = DeliveryStatusVO.arrived();
    this._arrivedAt = now;
    this.addDomainEvent(new DeliveryArrivedEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, fromStatus: from, toStatus: 'arrived' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  /** Record a physical attempt (success/fail/refused/no_one_available). */
  addAttempt(input: {
    id: string;
    status: string;
    reason?: string;
    driverId?: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    images?: readonly string[];
    notes?: string;
    now?: string;
  }): DeliveryAttemptVO {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot add attempt to delivery in status "${this._status.value}"`,
        'DELIVERY_FINALIZED',
        { deliveryId: this.id, status: this._status.value },
      );
    }
    if (this.remainingAttempts <= 0) {
      throw new DeliveryAttemptLimitExceededError(this.id, this.attemptCount);
    }
    const now = input.now ?? new Date().toISOString();
    const attemptNumber = this.attemptCount + 1;
    const attempt = DeliveryAttemptVO.create({
      id: input.id,
      attemptNumber,
      status: input.status,
      reason: input.reason,
      driverId: input.driverId ?? this._driverId?.value,
      attemptedAt: now,
      location: input.location,
      latitude: input.latitude,
      longitude: input.longitude,
      images: input.images,
      notes: input.notes,
    });
    this._attempts.push(attempt);
    this.addDomainEvent(new DeliveryAttemptAddedEvent({
      aggregateId: this.id,
      payload: {
        deliveryId: this.id,
        attemptId: attempt.id,
        attemptNumber,
        status: attempt.status.value,
        reason: attempt.reason,
        attemptedAt: now,
      },
      version: this.version + 1,
    }));
    // Auto-transition based on attempt status
    const attemptStatus = DeliveryAttemptStatusVO.reconstitute(attempt.status.value);
    if (attemptStatus.isSuccess()) {
      // will be followed by markDelivered; no auto-transition here
    } else if (attemptStatus.shouldRetry()) {
      this._status = DeliveryStatusVO.failed();
      this._failedAt = now;
    } else {
      this._status = DeliveryStatusVO.failed();
      this._failedAt = now;
    }
    this.touch(now);
    this.incrementVersion();
    return attempt;
  }

  /** Mark the delivery as successfully delivered (requires proof if config). */
  markDelivered(
    proof: ProofOfDeliveryVO | undefined,
    receivedBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isOutForDelivery()) {
      this._status = DeliveryStatusVO.arrived();
    }
    this.assertTransitionTo('delivered');
    if (DELIVERY.PROOF_REQUIRED && !proof) {
      throw new DeliveryProofRequiredError();
    }
    const from = this._status.value;
    this._status = DeliveryStatusVO.delivered();
    this._deliveredAt = now;
    this._proofOfDelivery = proof;
    if (proof) {
      this.addDomainEvent(new DeliveryProofCapturedEvent({
        aggregateId: this.id,
        payload: { deliveryId: this.id, proofType: proof.type, capturedAt: proof.capturedAt },
        version: this.version + 1,
      }));
    }
    this.addDomainEvent(new DeliveryDeliveredEvent({
      aggregateId: this.id,
      payload: {
        deliveryId: this.id,
        shipmentId: this._shipmentId.value,
        orderId: this._orderId.value,
        deliveredAt: now,
        recipientName: receivedBy ?? proof?.recipientName,
        proofType: proof?.type,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot fail delivery in status "${this._status.value}"`,
        'DELIVERY_FINALIZED',
        { deliveryId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = DeliveryStatusVO.failed();
    this._failedAt = now;
    this.addDomainEvent(new DeliveryFailedEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, failedAt: now, reason, attempts: this.attemptCount },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  reschedule(reason: string, now: string = new Date().toISOString()): void {
    if (!this.canBeRescheduled()) {
      throw new DeliveryCannotBeRescheduledError(this.id, this._status.value);
    }
    const from = this._status.value;
    this._status = DeliveryStatusVO.rescheduled();
    this.addDomainEvent(new DeliveryRescheduledEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, fromStatus: from, toStatus: 'rescheduled', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markRefused(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('refused');
    const from = this._status.value;
    this._status = DeliveryStatusVO.refused();
    this.addDomainEvent(new DeliveryRefusedEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, fromStatus: from, toStatus: 'refused', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Delivery cannot be cancelled in status "${this._status.value}"`,
        'DELIVERY_CANNOT_BE_CANCELLED',
        { deliveryId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = DeliveryStatusVO.cancelled();
    this._cancelledAt = now;
    this.addDomainEvent(new DeliveryCancelledEvent({
      aggregateId: this.id,
      payload: { deliveryId: this.id, fromStatus: from, toStatus: 'cancelled', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateNotes(notes: NotesVO, now: string = new Date().toISOString()): void {
    this._notes = notes;
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Factories ───
  static create(params: {
    id: string;
    props: Omit<DeliveryEntityProps, 'status' | 'attempts'> & { status?: DeliveryStatusVO };
    now: string;
  }): DeliveryEntity {
    const status = params.props.status ?? DeliveryStatusVO.scheduled();
    const fullProps: DeliveryEntityProps = { ...params.props, status, attempts: [] };
    const entity = new DeliveryEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new DeliveryScheduledEvent({
      aggregateId: params.id,
      payload: {
        deliveryId: params.id,
        shipmentId: fullProps.shipmentId.value,
        orderId: fullProps.orderId.value,
        type: fullProps.type.value,
        scheduledAt: fullProps.scheduledAt,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: DeliveryEntityProps; version?: number;
  }): DeliveryEntity {
    const entity = new DeliveryEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
