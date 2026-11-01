/**
 * FulfillmentEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   pending → processing → picking → packing → ready_to_ship → shipped
 *   → partially_fulfilled | fulfilled ✓ (final)
 *   pending/processing → on_hold → processing
 *   any (except final) → cancelled | failed
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FULFILLMENT } from '@vubon/shared-constants/logistics';

import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo.js';
import { FulfillmentTypeVO } from '../value-objects/primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '../value-objects/primitives/fulfillment-priority.vo.js';

import {
  FulfillmentCreatedEvent,
  FulfillmentStartedEvent,
  FulfillmentPickingEvent,
  FulfillmentPackingEvent,
  FulfillmentReadyToShipEvent,
  FulfillmentShippedEvent,
  FulfillmentFulfilledEvent,
  FulfillmentPartiallyFulfilledEvent,
  FulfillmentCancelledEvent,
  FulfillmentFailedEvent,
  FulfillmentOnHoldEvent,
  FulfillmentStatusChangedEvent,
} from '../events/fulfillment.events.js';

export interface FulfillmentEntityProps {
  readonly orderId: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly status: FulfillmentStatusVO;
  readonly type: FulfillmentTypeVO;
  readonly priority: FulfillmentPriorityVO;
  readonly itemIds: readonly string[];
  readonly assignedTo?: string;
  readonly pickedAt?: string;
  readonly packedAt?: string;
  readonly shippedAt?: string;
  readonly fulfilledAt?: string;
  readonly cancelledAt?: string;
  readonly failedAt?: string;
  readonly onHoldAt?: string;
  readonly slaDueAt?: string;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly holdReason?: string;
  readonly notes?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class FulfillmentEntity extends AggregateRoot<string> {
  private _status: FulfillmentStatusVO;
  private _warehouseId?: string;
  private _assignedTo?: string;
  private _pickedAt?: string;
  private _packedAt?: string;
  private _shippedAt?: string;
  private _fulfilledAt?: string;
  private _cancelledAt?: string;
  private _failedAt?: string;
  private _onHoldAt?: string;
  private _slaDueAt?: string;
  private _failureReason?: string;
  private _cancelReason?: string;
  private _holdReason?: string;
  private _notes?: string;

  private readonly _orderId: string;
  private readonly _vendorId?: string;
  private readonly _type: FulfillmentTypeVO;
  private readonly _priority: FulfillmentPriorityVO;
  private readonly _itemIds: readonly string[];
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: FulfillmentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._vendorId = props.vendorId;
    this._warehouseId = props.warehouseId;
    this._status = props.status;
    this._type = props.type;
    this._priority = props.priority;
    this._itemIds = props.itemIds;
    this._assignedTo = props.assignedTo;
    this._pickedAt = props.pickedAt;
    this._packedAt = props.packedAt;
    this._shippedAt = props.shippedAt;
    this._fulfilledAt = props.fulfilledAt;
    this._cancelledAt = props.cancelledAt;
    this._failedAt = props.failedAt;
    this._onHoldAt = props.onHoldAt;
    this._slaDueAt = props.slaDueAt;
    this._failureReason = props.failureReason;
    this._cancelReason = props.cancelReason;
    this._holdReason = props.holdReason;
    this._notes = props.notes;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._orderId) {
      throw new ValidationError('Order ID required', 'orderId');
    }
    if (this._itemIds.length === 0) {
      throw new ValidationError('Fulfillment must have at least one item', 'itemIds');
    }
    if (this._itemIds.length > FULFILLMENT.MAX_ITEMS_PER_FULFILLMENT) {
      throw new ValidationError(
        `Item count ${this._itemIds.length} exceeds max ${FULFILLMENT.MAX_ITEMS_PER_FULFILLMENT}`,
        'itemIds',
      );
    }
  }

  get orderId(): string { return this._orderId; }
  get vendorId(): string | undefined { return this._vendorId; }
  get warehouseId(): string | undefined { return this._warehouseId; }
  get status(): FulfillmentStatusVO { return this._status; }
  get type(): FulfillmentTypeVO { return this._type; }
  get priority(): FulfillmentPriorityVO { return this._priority; }
  get itemIds(): readonly string[] { return this._itemIds; }
  get itemCount(): number { return this._itemIds.length; }
  get assignedTo(): string | undefined { return this._assignedTo; }
  get pickedAt(): string | undefined { return this._pickedAt; }
  get packedAt(): string | undefined { return this._packedAt; }
  get shippedAt(): string | undefined { return this._shippedAt; }
  get fulfilledAt(): string | undefined { return this._fulfilledAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get onHoldAt(): string | undefined { return this._onHoldAt; }
  get slaDueAt(): string | undefined { return this._slaDueAt; }
  get failureReason(): string | undefined { return this._failureReason; }
  get cancelReason(): string | undefined { return this._cancelReason; }
  get holdReason(): string | undefined { return this._holdReason; }
  get notes(): string | undefined { return this._notes; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): FulfillmentIdVO { return FulfillmentIdVO.reconstitute(this.id); }

  isPending(): boolean { return this._status.isPending(); }
  isProcessing(): boolean { return this._status.isProcessing(); }
  isPicking(): boolean { return this._status.isPicking(); }
  isPacking(): boolean { return this._status.isPacking(); }
  isReadyToShip(): boolean { return this._status.isReadyToShip(); }
  isShipped(): boolean { return this._status.isShipped(); }
  isPartiallyFulfilled(): boolean { return this._status.isPartiallyFulfilled(); }
  isFulfilled(): boolean { return this._status.isFulfilled(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isOnHold(): boolean { return this._status.isOnHold(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isActive(): boolean { return this._status.isActive(); }

  isSlaBreached(ref: Date = new Date()): boolean {
    if (!this._slaDueAt || this.isFinal()) return false;
    return new Date(this._slaDueAt) < ref;
  }

  canBeCancelled(): boolean {
    return !this._status.isFinal() && !this.isShipped();
  }

  // ═══ Business Actions ═══
  start(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('processing');
    this.emitStatusChange(from, 'processing');
    this.addDomainEvent(
      new FulfillmentStartedEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, startedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  beginPicking(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('picking');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('picking');
    this._pickedAt = now;
    this.emitStatusChange(from, 'picking');
    this.addDomainEvent(
      new FulfillmentPickingEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, pickingStartedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  beginPacking(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('packing');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('packing');
    this._packedAt = now;
    this.emitStatusChange(from, 'packing');
    this.addDomainEvent(
      new FulfillmentPackingEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, packingStartedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReadyToShip(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('ready_to_ship');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('ready_to_ship');
    this.emitStatusChange(from, 'ready_to_ship');
    this.addDomainEvent(
      new FulfillmentReadyToShipEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, readyAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  ship(shipmentId?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('shipped');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('shipped');
    this._shippedAt = now;
    this.emitStatusChange(from, 'shipped');
    this.addDomainEvent(
      new FulfillmentShippedEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, shippedAt: now, shipmentId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fulfill(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('fulfilled');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('fulfilled');
    this._fulfilledAt = now;
    this.emitStatusChange(from, 'fulfilled');
    this.addDomainEvent(
      new FulfillmentFulfilledEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, fulfilledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPartiallyFulfilled(
    fulfilledItemCount: number,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('partially_fulfilled');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('partially_fulfilled');
    this.emitStatusChange(from, 'partially_fulfilled');
    this.addDomainEvent(
      new FulfillmentPartiallyFulfilledEvent({
        aggregateId: this.id,
        payload: {
          fulfillmentId: this.id,
          fulfilledItemCount,
          totalItemCount: this._itemIds.length,
          partiallyFulfilledAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Fulfillment cannot be cancelled in status "${this._status.value}"`,
        'FULFILLMENT_CANNOT_BE_CANCELLED',
        { fulfillmentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('cancelled');
    this._cancelledAt = now;
    this._cancelReason = reason;
    this.emitStatusChange(from, 'cancelled', reason);
    this.addDomainEvent(
      new FulfillmentCancelledEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, reason, cancelledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Fulfillment already final (status "${this._status.value}")`,
        'FULFILLMENT_ALREADY_FINAL',
        { fulfillmentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('failed');
    this._failedAt = now;
    this._failureReason = reason;
    this.emitStatusChange(from, 'failed', reason);
    this.addDomainEvent(
      new FulfillmentFailedEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, reason, failedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  putOnHold(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('on_hold');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('on_hold');
    this._onHoldAt = now;
    this._holdReason = reason;
    this.emitStatusChange(from, 'on_hold', reason);
    this.addDomainEvent(
      new FulfillmentOnHoldEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, reason, onHoldAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  resumeFromHold(now: string = new Date().toISOString()): void {
    if (!this.isOnHold()) {
      throw new BusinessRuleError(
        `Fulfillment is not on hold (status "${this._status.value}")`,
        'FULFILLMENT_NOT_ON_HOLD',
        { fulfillmentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.create('processing');
    this.emitStatusChange(from, 'processing');
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid fulfillment status transition: "${this._status.value}" → "${target}"`,
        'INVALID_FULFILLMENT_STATUS_TRANSITION',
        { from: this._status.value, to: target, fulfillmentId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new FulfillmentStatusChangedEvent({
        aggregateId: this.id,
        payload: { fulfillmentId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: FulfillmentIdVO;
    props: Omit<FulfillmentEntityProps, 'status'>;
    now: string;
  }): FulfillmentEntity {
    const entity = new FulfillmentEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: FulfillmentStatusVO.pending() },
    );
    entity.addDomainEvent(
      new FulfillmentCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          fulfillmentId: params.id.value,
          orderId: params.props.orderId,
          itemCount: params.props.itemIds.length,
          type: params.props.type.value,
          priority: params.props.priority.value,
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
    props: FulfillmentEntityProps;
    version?: number;
  }): FulfillmentEntity {
    const entity = new FulfillmentEntity(
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
