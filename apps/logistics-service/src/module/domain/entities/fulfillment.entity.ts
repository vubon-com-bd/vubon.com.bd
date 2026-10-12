/**
 * FulfillmentEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * Lifecycle: pending → processing → picking → packing → ready_to_ship
 *            → shipped → fulfilled (or partially_fulfilled)
 *            Any → cancelled / failed / on_hold
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { FULFILLMENT } from '@vubon/shared-constants/logistics';
import type { UserId } from '@vubon/shared-types/common';

import { FulfillmentIdVO } from '../value-objects/primitives/fulfillment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { FulfillmentStatusVO } from '../value-objects/primitives/fulfillment-status.vo.js';
import { FulfillmentTypeVO } from '../value-objects/primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '../value-objects/primitives/fulfillment-priority.vo.js';
import { NotesVO } from '../value-objects/primitives/notes.vo.js';
import { SlaVO } from '../value-objects/composites/sla.vo.js';

import {
  FulfillmentCreatedEvent,
  FulfillmentProcessingStartedEvent,
  FulfillmentPickingStartedEvent,
  FulfillmentPackingStartedEvent,
  FulfillmentReadyToShipEvent,
  FulfillmentShippedEvent,
  FulfillmentPartiallyFulfilledEvent,
  FulfillmentFulfilledEvent,
  FulfillmentOnHoldEvent,
  FulfillmentReleasedEvent,
  FulfillmentFailedEvent,
  FulfillmentCancelledEvent,
  FulfillmentAssignedEvent,
  FulfillmentSlaBreachedEvent,
} from '../events/fulfillment.events.js';

import { InvalidFulfillmentStatusTransitionError } from '../errors/fulfillment.errors.js';

export interface FulfillmentEntityProps {
  readonly orderId: OrderIdVO;
  readonly vendorId?: VendorIdVO;
  readonly warehouseId?: WarehouseIdVO;
  readonly status: FulfillmentStatusVO;
  readonly type: FulfillmentTypeVO;
  readonly priority: FulfillmentPriorityVO;
  readonly itemIds: readonly string[];
  readonly assignedTo?: UserId;
  readonly pickedAt?: string;
  readonly packedAt?: string;
  readonly shippedAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: NotesVO;
  readonly sla?: SlaVO;
}

export class FulfillmentEntity extends AggregateRoot<string> {
  private _status: FulfillmentStatusVO;
  private _priority: FulfillmentPriorityVO;
  private _assignedTo?: UserId;
  private _pickedAt?: string;
  private _packedAt?: string;
  private _shippedAt?: string;
  private _cancelledAt?: string;
  private _notes?: NotesVO;
  private _sla?: SlaVO;

  private readonly _orderId: OrderIdVO;
  private readonly _vendorId?: VendorIdVO;
  private readonly _warehouseId?: WarehouseIdVO;
  private readonly _type: FulfillmentTypeVO;
  private readonly _itemIds: readonly string[];

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: FulfillmentEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._vendorId = props.vendorId;
    this._warehouseId = props.warehouseId;
    this._status = props.status;
    this._type = props.type;
    this._priority = props.priority;
    this._itemIds = [...props.itemIds];
    this._assignedTo = props.assignedTo;
    this._pickedAt = props.pickedAt;
    this._packedAt = props.packedAt;
    this._shippedAt = props.shippedAt;
    this._cancelledAt = props.cancelledAt;
    this._notes = props.notes;
    this._sla = props.sla;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._itemIds.length === 0) {
      throw new ValidationError('Fulfillment requires at least one item', 'itemIds');
    }
    if (this._itemIds.length > FULFILLMENT.MAX_ITEMS_PER_FULFILLMENT) {
      throw new ValidationError(
        `Item count exceeds max ${FULFILLMENT.MAX_ITEMS_PER_FULFILLMENT}`,
        'itemIds',
      );
    }
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get vendorId(): VendorIdVO | undefined { return this._vendorId; }
  get warehouseId(): WarehouseIdVO | undefined { return this._warehouseId; }
  get status(): FulfillmentStatusVO { return this._status; }
  get type(): FulfillmentTypeVO { return this._type; }
  get priority(): FulfillmentPriorityVO { return this._priority; }
  get itemIds(): readonly string[] { return this._itemIds; }
  get assignedTo(): UserId | undefined { return this._assignedTo; }
  get pickedAt(): string | undefined { return this._pickedAt; }
  get packedAt(): string | undefined { return this._packedAt; }
  get shippedAt(): string | undefined { return this._shippedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get notes(): NotesVO | undefined { return this._notes; }
  get sla(): SlaVO | undefined { return this._sla; }
  get toIdVO(): FulfillmentIdVO { return FulfillmentIdVO.reconstitute(this.id); }

  get itemCount(): number { return this._itemIds.length; }
  get isAssigned(): boolean { return this._assignedTo !== undefined; }
  isPending(): boolean { return this._status.isPending(); }
  isProcessing(): boolean { return this._status.isProcessing(); }
  isPicking(): boolean { return this._status.isPicking(); }
  isPacking(): boolean { return this._status.isPacking(); }
  isReadyToShip(): boolean { return this._status.isReadyToShip(); }
  isShipped(): boolean { return this._status.isShipped(); }
  isFulfilled(): boolean { return this._status.isFulfilled(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isOnHold(): boolean { return this._status.isOnHold(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isInProgress(): boolean { return this._status.isInProgress(); }

  isSlaBreached(at: Date = new Date()): boolean {
    return this._sla ? this._sla.isBreached(at) : false;
  }

  canBeCancelled(): boolean { return this._status.canBeCancelled(); }
  canBeShipped(): boolean { return this._status.canBeShipped(); }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidFulfillmentStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  assign(userId: UserId, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot assign fulfillment in status "${this._status.value}"`,
        'FULFILLMENT_CANNOT_BE_MODIFIED',
        { fulfillmentId: this.id, status: this._status.value },
      );
    }
    this._assignedTo = userId;
    this.addDomainEvent(new FulfillmentAssignedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, assignedTo: userId, assignedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  changePriority(priority: FulfillmentPriorityVO, now: string = new Date().toISOString()): void {
    if (this.isShipped() || this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot change priority in status "${this._status.value}"`,
        'FULFILLMENT_CANNOT_BE_MODIFIED',
        { fulfillmentId: this.id, status: this._status.value },
      );
    }
    this._priority = priority;
    this.touch(now);
    this.incrementVersion();
  }

  startProcessing(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.processing();
    this.addDomainEvent(new FulfillmentProcessingStartedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'processing' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  startPicking(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('picking');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.picking();
    this.addDomainEvent(new FulfillmentPickingStartedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'picking' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  startPacking(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('packing');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.packing();
    this._pickedAt = now;
    this.addDomainEvent(new FulfillmentPackingStartedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'packing' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markReadyToShip(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('ready_to_ship');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.readyToShip();
    this._packedAt = now;
    this.addDomainEvent(new FulfillmentReadyToShipEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'ready_to_ship' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  ship(now: string = new Date().toISOString()): void {
    if (!this.canBeShipped()) {
      throw new BusinessRuleError(
        `Cannot ship fulfillment in status "${this._status.value}"`,
        'FULFILLMENT_CANNOT_BE_SHIPPED',
        { fulfillmentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('shipped');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.shipped();
    this._shippedAt = now;
    this.addDomainEvent(new FulfillmentShippedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'shipped' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markPartiallyFulfilled(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('partially_fulfilled');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.partiallyFulfilled();
    this.addDomainEvent(new FulfillmentPartiallyFulfilledEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'partially_fulfilled' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markFulfilled(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('fulfilled');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.fulfilled();
    this.addDomainEvent(new FulfillmentFulfilledEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'fulfilled' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  putOnHold(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('on_hold');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.onHold();
    this.addDomainEvent(new FulfillmentOnHoldEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'on_hold', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  release(now: string = new Date().toISOString()): void {
    if (!this.isOnHold()) {
      throw new BusinessRuleError('Fulfillment is not on hold', 'FULFILLMENT_NOT_ON_HOLD', { fulfillmentId: this.id });
    }
    const from = this._status.value;
    this._status = FulfillmentStatusVO.processing();
    this.addDomainEvent(new FulfillmentReleasedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'processing' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.failed();
    this.addDomainEvent(new FulfillmentFailedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'failed', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, changedBy?: UserId, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel fulfillment in status "${this._status.value}"`,
        'FULFILLMENT_CANNOT_BE_CANCELLED',
        { fulfillmentId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = FulfillmentStatusVO.cancelled();
    this._cancelledAt = now;
    this.addDomainEvent(new FulfillmentCancelledEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, fromStatus: from, toStatus: 'cancelled', changedBy, reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  recordSlaBreach(now: string = new Date().toISOString()): void {
    if (!this._sla || this._sla.isBreachedRecorded()) return;
    this._sla = this._sla.withBreach(new Date(now));
    this.addDomainEvent(new FulfillmentSlaBreachedEvent({
      aggregateId: this.id,
      payload: { fulfillmentId: this.id, dueAt: this._sla.dueAt, breachedAt: now },
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

  static create(params: {
    id: string;
    props: Omit<FulfillmentEntityProps, 'status'> & { status?: FulfillmentStatusVO };
    now: string;
  }): FulfillmentEntity {
    const status = params.props.status ?? FulfillmentStatusVO.pending();
    const fullProps: FulfillmentEntityProps = { ...params.props, status };
    const entity = new FulfillmentEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new FulfillmentCreatedEvent({
      aggregateId: params.id,
      payload: {
        fulfillmentId: params.id,
        orderId: fullProps.orderId.value,
        vendorId: fullProps.vendorId?.value,
        warehouseId: fullProps.warehouseId?.value,
        type: fullProps.type.value,
        priority: fullProps.priority.value,
        itemCount: fullProps.itemIds.length,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: FulfillmentEntityProps; version?: number;
  }): FulfillmentEntity {
    const entity = new FulfillmentEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
