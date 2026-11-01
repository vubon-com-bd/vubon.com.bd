/**
 * ShipmentEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   pending → confirmed → processing → packed → picked_up
 *   → in_transit → out_for_delivery → delivered ✓ (final)
 *   out_for_delivery → failed → returned | cancelled
 *   any (except final) → cancelled | on_hold
 *   failed → delayed → in_transit (retry)
 *
 * Invariants:
 *   - itemCount must be 1..MAX_ITEMS_PER_SHIPMENT
 *   - totalWeightKg must be 0..MAX_WEIGHT_KG
 *   - declaredValue must be 0..MAX_DECLARED_VALUE
 *   - trackingNumber not empty
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT } from '@vubon/shared-constants/logistics';

import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { ShipmentNumberVO } from '../value-objects/primitives/shipment-number.vo.js';
import { ShipmentStatusVO } from '../value-objects/primitives/shipment-status.vo.js';
import { ShipmentTypeVO } from '../value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '../value-objects/primitives/shipment-priority.vo.js';
import { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo.js';

import {
  ShipmentCreatedEvent,
  ShipmentStatusChangedEvent,
  ShipmentConfirmedEvent,
  ShipmentProcessingStartedEvent,
  ShipmentPackedEvent,
  ShipmentPickedUpEvent,
  ShipmentInTransitEvent,
  ShipmentOutForDeliveryEvent,
  ShipmentDeliveredEvent,
  ShipmentFailedEvent,
  ShipmentReturnedEvent,
  ShipmentCancelledEvent,
  ShipmentOnHoldEvent,
  ShipmentDelayedEvent,
} from '../events/shipment.events.js';

// ─── Props Interface ──────────────────────
export interface ShipmentEntityProps {
  readonly shipmentNumber: ShipmentNumberVO;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusVO;
  readonly type: ShipmentTypeVO;
  readonly priority: ShipmentPriorityVO;

  // Cross-domain references (VOs not-yet-created → plain strings)
  readonly orderId?: string;
  readonly userId?: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly courierId?: string;
  readonly courierTrackingNumber?: string;

  // Addresses (snapshot strings — Application layer parses to typed Address)
  readonly shippingAddress: string;
  readonly pickupAddress?: string;

  // Package info
  readonly itemCount: number;
  readonly totalWeightKg?: number;
  readonly totalVolumeM3?: number;

  // Money
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly shippingCost?: number;
  readonly codAmount?: number;
  readonly isCOD: boolean;
  readonly isInsured: boolean;

  // External links
  readonly labelUrl?: string;

  // Timestamps
  readonly estimatedDeliveryAt?: string;
  readonly confirmedAt?: string;
  readonly processingStartedAt?: string;
  readonly packedAt?: string;
  readonly pickedUpAt?: string;
  readonly inTransitAt?: string;
  readonly outForDeliveryAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly onHoldAt?: string;
  readonly delayedAt?: string;

  // Audit
  readonly cancelledBy?: string;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly holdReason?: string;
  readonly delayReason?: string;
  readonly notes?: string;
  readonly idempotencyKey?: IdempotencyKeyVO;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

// ─── Entity Class ─────────────────────────
export class ShipmentEntity extends AggregateRoot<string> {
  // Mutable state
  private _status: ShipmentStatusVO;
  private _courierId?: string;
  private _courierTrackingNumber?: string;
  private _labelUrl?: string;
  private _estimatedDeliveryAt?: string;
  private _confirmedAt?: string;
  private _processingStartedAt?: string;
  private _packedAt?: string;
  private _pickedUpAt?: string;
  private _inTransitAt?: string;
  private _outForDeliveryAt?: string;
  private _deliveredAt?: string;
  private _failedAt?: string;
  private _returnedAt?: string;
  private _cancelledAt?: string;
  private _onHoldAt?: string;
  private _delayedAt?: string;
  private _cancelledBy?: string;
  private _failureReason?: string;
  private _cancelReason?: string;
  private _holdReason?: string;
  private _delayReason?: string;
  private _notes?: string;

  // Immutable references
  private readonly _shipmentNumber: ShipmentNumberVO;
  private readonly _trackingNumber: string;
  private readonly _type: ShipmentTypeVO;
  private readonly _priority: ShipmentPriorityVO;
  private readonly _orderId?: string;
  private readonly _userId?: string;
  private readonly _vendorId?: string;
  private readonly _warehouseId?: string;
  private readonly _shippingAddress: string;
  private readonly _pickupAddress?: string;
  private readonly _itemCount: number;
  private readonly _totalWeightKg?: number;
  private readonly _totalVolumeM3?: number;
  private readonly _declaredValue?: number;
  private readonly _currency?: string;
  private readonly _shippingCost?: number;
  private readonly _codAmount?: number;
  private readonly _isCOD: boolean;
  private readonly _isInsured: boolean;
  private readonly _idempotencyKey?: IdempotencyKeyVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ShipmentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._shipmentNumber = props.shipmentNumber;
    this._trackingNumber = props.trackingNumber;
    this._status = props.status;
    this._type = props.type;
    this._priority = props.priority;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._vendorId = props.vendorId;
    this._warehouseId = props.warehouseId;
    this._courierId = props.courierId;
    this._courierTrackingNumber = props.courierTrackingNumber;
    this._shippingAddress = props.shippingAddress;
    this._pickupAddress = props.pickupAddress;
    this._itemCount = props.itemCount;
    this._totalWeightKg = props.totalWeightKg;
    this._totalVolumeM3 = props.totalVolumeM3;
    this._declaredValue = props.declaredValue;
    this._currency = props.currency;
    this._shippingCost = props.shippingCost;
    this._codAmount = props.codAmount;
    this._isCOD = props.isCOD;
    this._isInsured = props.isInsured;
    this._labelUrl = props.labelUrl;
    this._estimatedDeliveryAt = props.estimatedDeliveryAt;
    this._confirmedAt = props.confirmedAt;
    this._processingStartedAt = props.processingStartedAt;
    this._packedAt = props.packedAt;
    this._pickedUpAt = props.pickedUpAt;
    this._inTransitAt = props.inTransitAt;
    this._outForDeliveryAt = props.outForDeliveryAt;
    this._deliveredAt = props.deliveredAt;
    this._failedAt = props.failedAt;
    this._returnedAt = props.returnedAt;
    this._cancelledAt = props.cancelledAt;
    this._onHoldAt = props.onHoldAt;
    this._delayedAt = props.delayedAt;
    this._cancelledBy = props.cancelledBy;
    this._failureReason = props.failureReason;
    this._cancelReason = props.cancelReason;
    this._holdReason = props.holdReason;
    this._delayReason = props.delayReason;
    this._notes = props.notes;
    this._metadata = props.metadata;

    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    // Item count
    if (!Number.isInteger(this._itemCount) || this._itemCount < 1) {
      throw new ValidationError('Shipment must have at least 1 item', 'itemCount');
    }
    if (this._itemCount > SHIPMENT.MAX_ITEMS_PER_SHIPMENT) {
      throw new ValidationError(
        `Shipment item count ${this._itemCount} exceeds max ${SHIPMENT.MAX_ITEMS_PER_SHIPMENT}`,
        'itemCount',
      );
    }

    // Weight
    if (this._totalWeightKg !== undefined) {
      if (this._totalWeightKg < 0) {
        throw new ValidationError('Total weight cannot be negative', 'totalWeightKg');
      }
      if (this._totalWeightKg > SHIPMENT.MAX_WEIGHT_KG) {
        throw new ValidationError(
          `Total weight ${this._totalWeightKg}kg exceeds max ${SHIPMENT.MAX_WEIGHT_KG}kg`,
          'totalWeightKg',
        );
      }
    }

    // Declared value
    if (this._declaredValue !== undefined) {
      if (this._declaredValue < 0) {
        throw new ValidationError('Declared value cannot be negative', 'declaredValue');
      }
      if (this._declaredValue > SHIPMENT.MAX_DECLARED_VALUE) {
        throw new ValidationError(
          `Declared value ${this._declaredValue} exceeds max ${SHIPMENT.MAX_DECLARED_VALUE}`,
          'declaredValue',
        );
      }
    }

    // COD
    if (this._codAmount !== undefined && this._codAmount < 0) {
      throw new ValidationError('COD amount cannot be negative', 'codAmount');
    }

    // Tracking number
    if (!this._trackingNumber || this._trackingNumber.trim().length === 0) {
      throw new ValidationError('Tracking number cannot be empty', 'trackingNumber');
    }
  }

  // ═══════════════ Getters ═══════════════
  get shipmentNumber(): ShipmentNumberVO {
    return this._shipmentNumber;
  }
  get trackingNumber(): string {
    return this._trackingNumber;
  }
  get status(): ShipmentStatusVO {
    return this._status;
  }
  get type(): ShipmentTypeVO {
    return this._type;
  }
  get priority(): ShipmentPriorityVO {
    return this._priority;
  }
  get orderId(): string | undefined {
    return this._orderId;
  }
  get userId(): string | undefined {
    return this._userId;
  }
  get vendorId(): string | undefined {
    return this._vendorId;
  }
  get warehouseId(): string | undefined {
    return this._warehouseId;
  }
  get courierId(): string | undefined {
    return this._courierId;
  }
  get courierTrackingNumber(): string | undefined {
    return this._courierTrackingNumber;
  }
  get shippingAddress(): string {
    return this._shippingAddress;
  }
  get pickupAddress(): string | undefined {
    return this._pickupAddress;
  }
  get itemCount(): number {
    return this._itemCount;
  }
  get totalWeightKg(): number | undefined {
    return this._totalWeightKg;
  }
  get totalVolumeM3(): number | undefined {
    return this._totalVolumeM3;
  }
  get declaredValue(): number | undefined {
    return this._declaredValue;
  }
  get currency(): string | undefined {
    return this._currency;
  }
  get shippingCost(): number | undefined {
    return this._shippingCost;
  }
  get codAmount(): number | undefined {
    return this._codAmount;
  }
  get isCOD(): boolean {
    return this._isCOD;
  }
  get isInsured(): boolean {
    return this._isInsured;
  }
  get labelUrl(): string | undefined {
    return this._labelUrl;
  }
  get estimatedDeliveryAt(): string | undefined {
    return this._estimatedDeliveryAt;
  }
  get confirmedAt(): string | undefined {
    return this._confirmedAt;
  }
  get processingStartedAt(): string | undefined {
    return this._processingStartedAt;
  }
  get packedAt(): string | undefined {
    return this._packedAt;
  }
  get pickedUpAt(): string | undefined {
    return this._pickedUpAt;
  }
  get inTransitAt(): string | undefined {
    return this._inTransitAt;
  }
  get outForDeliveryAt(): string | undefined {
    return this._outForDeliveryAt;
  }
  get deliveredAt(): string | undefined {
    return this._deliveredAt;
  }
  get failedAt(): string | undefined {
    return this._failedAt;
  }
  get returnedAt(): string | undefined {
    return this._returnedAt;
  }
  get cancelledAt(): string | undefined {
    return this._cancelledAt;
  }
  get onHoldAt(): string | undefined {
    return this._onHoldAt;
  }
  get delayedAt(): string | undefined {
    return this._delayedAt;
  }
  get cancelledBy(): string | undefined {
    return this._cancelledBy;
  }
  get failureReason(): string | undefined {
    return this._failureReason;
  }
  get cancelReason(): string | undefined {
    return this._cancelReason;
  }
  get holdReason(): string | undefined {
    return this._holdReason;
  }
  get delayReason(): string | undefined {
    return this._delayReason;
  }
  get notes(): string | undefined {
    return this._notes;
  }
  get metadata(): Readonly<Record<string, unknown>> | undefined {
    return this._metadata;
  }

  get idempotencyKey(): IdempotencyKeyVO | undefined {
    return this._idempotencyKey;
  }

  get toIdVO(): ShipmentIdVO {
    return ShipmentIdVO.reconstitute(this.id);
  }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean {
    return this._status.isPending();
  }
  isConfirmed(): boolean {
    return this._status.isConfirmed();
  }
  isProcessing(): boolean {
    return this._status.isProcessing();
  }
  isPacked(): boolean {
    return this._status.isPacked();
  }
  isPickedUp(): boolean {
    return this._status.isPickedUp();
  }
  isInTransit(): boolean {
    return this._status.isInTransit();
  }
  isOutForDelivery(): boolean {
    return this._status.isOutForDelivery();
  }
  isDelivered(): boolean {
    return this._status.isDelivered();
  }
  isFailed(): boolean {
    return this._status.isFailed();
  }
  isReturned(): boolean {
    return this._status.isReturned();
  }
  isCancelled(): boolean {
    return this._status.isCancelled();
  }
  isOnHold(): boolean {
    return this._status.isOnHold();
  }
  isDelayed(): boolean {
    return this._status.isDelayed();
  }
  isFinal(): boolean {
    return this._status.isFinal();
  }

  canBeCancelled(): boolean {
    return this._status.isCancellable();
  }

  hasCOD(): boolean {
    return this._isCOD && (this._codAmount ?? 0) > 0;
  }

  hasInsurance(): boolean {
    return this._isInsured && (this._declaredValue ?? 0) > 0;
  }

  // ═══════════════ Business Actions ═══════════════
  confirm(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('confirmed');
    const from = this._status.value;
    this._status = ShipmentStatusVO.confirmed();
    this._confirmedAt = now;
    this.emitStatusChange(from, 'confirmed');
    this.addDomainEvent(
      new ShipmentConfirmedEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          shipmentNumber: this._shipmentNumber.value,
          confirmedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startProcessing(
    warehouseId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('processing');
    this._processingStartedAt = now;
    this.emitStatusChange(from, 'processing');
    this.addDomainEvent(
      new ShipmentProcessingStartedEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          warehouseId,
          startedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pack(
    packageId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('packed');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('packed');
    this._packedAt = now;
    this.emitStatusChange(from, 'packed');
    this.addDomainEvent(
      new ShipmentPackedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, packedAt: now, packageId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pickUp(
    courierId?: string,
    driverId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('picked_up');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('picked_up');
    this._pickedUpAt = now;
    if (courierId) this._courierId = courierId;
    this.emitStatusChange(from, 'picked_up');
    this.addDomainEvent(
      new ShipmentPickedUpEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          pickedUpAt: now,
          courierId,
          driverId,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startTransit(
    currentLocation?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('in_transit');
    this._inTransitAt = now;
    this.emitStatusChange(from, 'in_transit');
    this.addDomainEvent(
      new ShipmentInTransitEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          inTransitAt: now,
          currentLocation,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  outForDelivery(
    driverId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('out_for_delivery');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('out_for_delivery');
    this._outForDeliveryAt = now;
    this.emitStatusChange(from, 'out_for_delivery');
    this.addDomainEvent(
      new ShipmentOutForDeliveryEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          outForDeliveryAt: now,
          driverId,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(
    recipientName?: string,
    signedBy?: string,
    driverId?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('delivered');
    const from = this._status.value;
    this._status = ShipmentStatusVO.delivered();
    this._deliveredAt = now;
    this.emitStatusChange(from, 'delivered');
    this.addDomainEvent(
      new ShipmentDeliveredEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          deliveredAt: now,
          recipientName,
          signedBy,
          driverId,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(
    reason: string,
    attemptedCount: number = 1,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('failed');
    this._failedAt = now;
    this._failureReason = reason;
    this.emitStatusChange(from, 'failed', undefined, reason);
    this.addDomainEvent(
      new ShipmentFailedEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          failedAt: now,
          reason,
          attemptedCount,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReturned(
    returnReason?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('returned');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('returned');
    this._returnedAt = now;
    this.emitStatusChange(from, 'returned');
    this.addDomainEvent(
      new ShipmentReturnedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, returnedAt: now, returnReason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(
    reason?: string,
    cancelledBy?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel shipment in status "${this._status.value}"`,
        'SHIPMENT_CANNOT_BE_CANCELLED',
        { shipmentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = ShipmentStatusVO.cancelled();
    this._cancelledAt = now;
    this._cancelledBy = cancelledBy;
    this._cancelReason = reason;
    this.emitStatusChange(from, 'cancelled', cancelledBy, reason);
    this.addDomainEvent(
      new ShipmentCancelledEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          cancelledAt: now,
          reason,
          cancelledBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  putOnHold(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('on_hold');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('on_hold');
    this._onHoldAt = now;
    this._holdReason = reason;
    this.emitStatusChange(from, 'on_hold', undefined, reason);
    this.addDomainEvent(
      new ShipmentOnHoldEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, onHoldAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelayed(
    reason: string,
    newEstimatedDeliveryAt?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('delayed');
    const from = this._status.value;
    this._status = ShipmentStatusVO.create('delayed');
    this._delayedAt = now;
    this._delayReason = reason;
    if (newEstimatedDeliveryAt) {
      this._estimatedDeliveryAt = newEstimatedDeliveryAt;
    }
    this.emitStatusChange(from, 'delayed', undefined, reason);
    this.addDomainEvent(
      new ShipmentDelayedEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          delayedAt: now,
          reason,
          newEstimatedDeliveryAt,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  resumeFromHold(now: string = new Date().toISOString()): void {
    if (!this.isOnHold()) {
      throw new BusinessRuleError(
        `Cannot resume shipment in status "${this._status.value}"`,
        'SHIPMENT_NOT_ON_HOLD',
        { shipmentId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = ShipmentStatusVO.pending();
    this._holdReason = undefined;
    this.emitStatusChange(from, 'pending');
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid status transition: "${this._status.value}" → "${target}"`,
        'INVALID_SHIPMENT_STATUS_TRANSITION',
        { from: this._status.value, to: target, shipmentId: this.id },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    reason?: string,
  ): void {
    this.addDomainEvent(
      new ShipmentStatusChangedEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          fromStatus: from,
          toStatus: to,
          changedBy,
          reason,
        },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: ShipmentIdVO;
    props: Omit<ShipmentEntityProps, 'status'>;
    now: string;
  }): ShipmentEntity {
    const entity = new ShipmentEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: ShipmentStatusVO.pending() },
    );

    entity.addDomainEvent(
      new ShipmentCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          shipmentId: params.id.value,
          shipmentNumber: params.props.shipmentNumber.value,
          trackingNumber: params.props.trackingNumber,
          orderId: params.props.orderId,
          type: params.props.type.value,
          priority: params.props.priority.value,
          itemCount: params.props.itemCount,
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
    props: ShipmentEntityProps;
    version?: number;
  }): ShipmentEntity {
    const entity = new ShipmentEntity(
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
