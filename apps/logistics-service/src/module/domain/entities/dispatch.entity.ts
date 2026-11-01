/**
 * DispatchEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   pending → assigned → dispatched → in_transit → delivered ✓
 *   any (except final) → failed | cancelled
 *   delivered → returned ✓ (final)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DISPATCH } from '@vubon/shared-constants/logistics';

import { DispatchIdVO } from '../value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '../value-objects/primitives/dispatch-number.vo.js';
import { DispatchStatusVO } from '../value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '../value-objects/primitives/dispatch-type.vo.js';

import {
  DispatchCreatedEvent,
  DispatchAssignedEvent,
  DispatchDispatchedEvent,
  DispatchInTransitEvent,
  DispatchDeliveredEvent,
  DispatchFailedEvent,
  DispatchReturnedEvent,
  DispatchCancelledEvent,
  DispatchStatusChangedEvent,
} from '../events/dispatch.events.js';

export interface DispatchEntityProps {
  readonly dispatchNumber: DispatchNumberVO;
  readonly status: DispatchStatusVO;
  readonly type: DispatchTypeVO;
  readonly shipmentIds: readonly string[];
  readonly courierId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly warehouseId?: string;
  readonly manifestUrl?: string;
  readonly totalWeight?: number;
  readonly dispatchedAt?: string;
  readonly inTransitAt?: string;
  readonly estimatedArrivalAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly failureReason?: string;
  readonly cancelReason?: string;
  readonly returnReason?: string;
  readonly notes?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class DispatchEntity extends AggregateRoot<string> {
  private _status: DispatchStatusVO;
  private _courierId?: string;
  private _vehicleId?: string;
  private _driverId?: string;
  private _manifestUrl?: string;
  private _dispatchedAt?: string;
  private _inTransitAt?: string;
  private _estimatedArrivalAt?: string;
  private _deliveredAt?: string;
  private _failedAt?: string;
  private _returnedAt?: string;
  private _cancelledAt?: string;
  private _failureReason?: string;
  private _cancelReason?: string;
  private _returnReason?: string;
  private _notes?: string;

  private readonly _dispatchNumber: DispatchNumberVO;
  private readonly _type: DispatchTypeVO;
  private readonly _shipmentIds: readonly string[];
  private readonly _warehouseId?: string;
  private readonly _totalWeight?: number;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: DispatchEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._dispatchNumber = props.dispatchNumber;
    this._status = props.status;
    this._type = props.type;
    this._shipmentIds = props.shipmentIds;
    this._courierId = props.courierId;
    this._vehicleId = props.vehicleId;
    this._driverId = props.driverId;
    this._warehouseId = props.warehouseId;
    this._manifestUrl = props.manifestUrl;
    this._totalWeight = props.totalWeight;
    this._dispatchedAt = props.dispatchedAt;
    this._inTransitAt = props.inTransitAt;
    this._estimatedArrivalAt = props.estimatedArrivalAt;
    this._deliveredAt = props.deliveredAt;
    this._failedAt = props.failedAt;
    this._returnedAt = props.returnedAt;
    this._cancelledAt = props.cancelledAt;
    this._failureReason = props.failureReason;
    this._cancelReason = props.cancelReason;
    this._returnReason = props.returnReason;
    this._notes = props.notes;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._shipmentIds.length === 0) {
      throw new ValidationError('Dispatch must have at least one shipment', 'shipmentIds');
    }
    if (this._shipmentIds.length > DISPATCH.MAX_ITEMS_PER_DISPATCH) {
      throw new ValidationError(
        `Shipment count ${this._shipmentIds.length} exceeds max ${DISPATCH.MAX_ITEMS_PER_DISPATCH}`,
        'shipmentIds',
      );
    }
    if (this._totalWeight !== undefined && this._totalWeight < 0) {
      throw new ValidationError('Total weight cannot be negative', 'totalWeight');
    }
  }

  get dispatchNumber(): DispatchNumberVO { return this._dispatchNumber; }
  get status(): DispatchStatusVO { return this._status; }
  get type(): DispatchTypeVO { return this._type; }
  get shipmentIds(): readonly string[] { return this._shipmentIds; }
  get itemCount(): number { return this._shipmentIds.length; }
  get courierId(): string | undefined { return this._courierId; }
  get vehicleId(): string | undefined { return this._vehicleId; }
  get driverId(): string | undefined { return this._driverId; }
  get warehouseId(): string | undefined { return this._warehouseId; }
  get manifestUrl(): string | undefined { return this._manifestUrl; }
  get totalWeight(): number | undefined { return this._totalWeight; }
  get dispatchedAt(): string | undefined { return this._dispatchedAt; }
  get inTransitAt(): string | undefined { return this._inTransitAt; }
  get estimatedArrivalAt(): string | undefined { return this._estimatedArrivalAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get returnedAt(): string | undefined { return this._returnedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get failureReason(): string | undefined { return this._failureReason; }
  get cancelReason(): string | undefined { return this._cancelReason; }
  get returnReason(): string | undefined { return this._returnReason; }
  get notes(): string | undefined { return this._notes; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): DispatchIdVO { return DispatchIdVO.reconstitute(this.id); }

  isPending(): boolean { return this._status.isPending(); }
  isAssigned(): boolean { return this._status.isAssigned(); }
  isDispatched(): boolean { return this._status.isDispatched(); }
  isInTransit(): boolean { return this._status.isInTransit(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isReturned(): boolean { return this._status.isReturned(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isCompleted(): boolean { return this._status.isCompleted(); }

  hasCourier(): boolean { return !!this._courierId; }
  hasVehicle(): boolean { return !!this._vehicleId; }
  hasDriver(): boolean { return !!this._driverId; }
  hasManifest(): boolean { return !!this._manifestUrl; }
  hasAssignedTransport(): boolean { return this.hasCourier() || this.hasVehicle(); }

  canBeCancelled(): boolean {
    return !this.isFinal() && !this.isDispatched() && !this.isInTransit();
  }

  // ═══ Business Actions ═══
  assign(
    params: {
      courierId?: string;
      vehicleId?: string;
      driverId?: string;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (!params.courierId && !params.vehicleId) {
      throw new BusinessRuleError(
        `Dispatch "${this.id}" requires a courier or vehicle`,
        'DISPATCH_REQUIRES_COURIER_OR_VEHICLE',
        { dispatchId: this.id },
      );
    }
    this.assertTransitionTo('assigned');
    const from = this._status.value;
    this._status = DispatchStatusVO.create('assigned');
    this._courierId = params.courierId;
    this._vehicleId = params.vehicleId;
    this._driverId = params.driverId;
    this.emitStatusChange(from, 'assigned');
    this.addDomainEvent(
      new DispatchAssignedEvent({
        aggregateId: this.id,
        payload: {
          dispatchId: this.id,
          courierId: params.courierId,
          vehicleId: params.vehicleId,
          driverId: params.driverId,
          assignedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  dispatch(manifestUrl?: string, now: string = new Date().toISOString()): void {
    if (!this.hasAssignedTransport()) {
      throw new BusinessRuleError(
        `Cannot dispatch without courier or vehicle`,
        'DISPATCH_REQUIRES_COURIER_OR_VEHICLE',
        { dispatchId: this.id },
      );
    }
    this.assertTransitionTo('dispatched');
    const from = this._status.value;
    this._status = DispatchStatusVO.create('dispatched');
    this._dispatchedAt = now;
    if (manifestUrl) this._manifestUrl = manifestUrl;
    this.emitStatusChange(from, 'dispatched');
    this.addDomainEvent(
      new DispatchDispatchedEvent({
        aggregateId: this.id,
        payload: {
          dispatchId: this.id,
          dispatchedAt: now,
          manifestUrl: this._manifestUrl,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startTransit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = DispatchStatusVO.create('in_transit');
    this._inTransitAt = now;
    this.emitStatusChange(from, 'in_transit');
    this.addDomainEvent(
      new DispatchInTransitEvent({
        aggregateId: this.id,
        payload: { dispatchId: this.id, inTransitAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('delivered');
    const from = this._status.value;
    this._status = DispatchStatusVO.delivered();
    this._deliveredAt = now;
    this.emitStatusChange(from, 'delivered');
    this.addDomainEvent(
      new DispatchDeliveredEvent({
        aggregateId: this.id,
        payload: { dispatchId: this.id, deliveredAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = DispatchStatusVO.create('failed');
    this._failedAt = now;
    this._failureReason = reason;
    this.emitStatusChange(from, 'failed', reason);
    this.addDomainEvent(
      new DispatchFailedEvent({
        aggregateId: this.id,
        payload: { dispatchId: this.id, reason, failedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReturned(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('returned');
    const from = this._status.value;
    this._status = DispatchStatusVO.create('returned');
    this._returnedAt = now;
    this._returnReason = reason;
    this.emitStatusChange(from, 'returned', reason);
    this.addDomainEvent(
      new DispatchReturnedEvent({
        aggregateId: this.id,
        payload: { dispatchId: this.id, returnedAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Dispatch cannot be cancelled in status "${this._status.value}"`,
        'DISPATCH_CANNOT_BE_CANCELLED',
        { dispatchId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = DispatchStatusVO.create('cancelled');
    this._cancelledAt = now;
    this._cancelReason = reason;
    this.emitStatusChange(from, 'cancelled', reason);
    this.addDomainEvent(
      new DispatchCancelledEvent({
        aggregateId: this.id,
        payload: { dispatchId: this.id, cancelledAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid dispatch status transition: "${this._status.value}" → "${target}"`,
        'INVALID_DISPATCH_STATUS_TRANSITION',
        { from: this._status.value, to: target, dispatchId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new DispatchStatusChangedEvent({
        aggregateId: this.id,
        payload: { dispatchId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: DispatchIdVO;
    props: Omit<DispatchEntityProps, 'status'>;
    now: string;
  }): DispatchEntity {
    const entity = new DispatchEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: DispatchStatusVO.pending() },
    );
    entity.addDomainEvent(
      new DispatchCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          dispatchId: params.id.value,
          dispatchNumber: params.props.dispatchNumber.value,
          shipmentIds: params.props.shipmentIds,
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
    props: DispatchEntityProps;
    version?: number;
  }): DispatchEntity {
    const entity = new DispatchEntity(
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
