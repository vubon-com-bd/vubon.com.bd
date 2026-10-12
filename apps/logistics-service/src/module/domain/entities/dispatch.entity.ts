/**
 * DispatchEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DISPATCH } from '@vubon/shared-constants/logistics';

import { DispatchIdVO } from '../value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '../value-objects/primitives/dispatch-number.vo.js';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { DispatchStatusVO } from '../value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '../value-objects/primitives/dispatch-type.vo.js';
import { WeightKgVO } from '../value-objects/primitives/weight-kg.vo.js';
import { NotesVO } from '../value-objects/primitives/notes.vo.js';

import {
  DispatchCreatedEvent,
  DispatchAssignedEvent,
  DispatchStartedEvent,
  DispatchInTransitEvent,
  DispatchDeliveredEvent,
  DispatchFailedEvent,
  DispatchReturnedEvent,
  DispatchCancelledEvent,
  DispatchShipmentAddedEvent,
  DispatchShipmentRemovedEvent,
  DispatchManifestGeneratedEvent,
} from '../events/dispatch.events.js';

import {
  InvalidDispatchStatusTransitionError,
  DispatchItemLimitExceededError,
  DispatchAlreadyStartedError,
  DispatchAlreadyCompletedError,
} from '../errors/dispatch.errors.js';

export interface DispatchEntityProps {
  readonly dispatchNumber: DispatchNumberVO;
  readonly status: DispatchStatusVO;
  readonly type: DispatchTypeVO;
  readonly shipmentIds: readonly string[];
  readonly courierId?: CourierIdVO;
  readonly vehicleId?: VehicleIdVO;
  readonly driverId?: DriverIdVO;
  readonly warehouseId?: WarehouseIdVO;
  readonly manifestUrl?: string;
  readonly itemCount: number;
  readonly totalWeight?: WeightKgVO;
  readonly dispatchedAt?: string;
  readonly estimatedArrivalAt?: string;
  readonly deliveredAt?: string;
  readonly cancelledAt?: string;
  readonly notes?: NotesVO;
}

export class DispatchEntity extends AggregateRoot<string> {
  private _status: DispatchStatusVO;
  private _shipmentIds: string[];
  private _courierId?: CourierIdVO;
  private _vehicleId?: VehicleIdVO;
  private _driverId?: DriverIdVO;
  private _warehouseId?: WarehouseIdVO;
  private _manifestUrl?: string;
  private _itemCount: number;
  private _totalWeight?: WeightKgVO;
  private _dispatchedAt?: string;
  private _estimatedArrivalAt?: string;
  private _deliveredAt?: string;
  private _cancelledAt?: string;
  private _notes?: NotesVO;

  private readonly _dispatchNumber: DispatchNumberVO;
  private readonly _type: DispatchTypeVO;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: DispatchEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._dispatchNumber = props.dispatchNumber;
    this._status = props.status;
    this._type = props.type;
    this._shipmentIds = [...props.shipmentIds];
    this._courierId = props.courierId;
    this._vehicleId = props.vehicleId;
    this._driverId = props.driverId;
    this._warehouseId = props.warehouseId;
    this._manifestUrl = props.manifestUrl;
    this._itemCount = props.itemCount;
    this._totalWeight = props.totalWeight;
    this._dispatchedAt = props.dispatchedAt;
    this._estimatedArrivalAt = props.estimatedArrivalAt;
    this._deliveredAt = props.deliveredAt;
    this._cancelledAt = props.cancelledAt;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._shipmentIds.length === 0) {
      throw new ValidationError('Dispatch requires at least one shipment', 'shipmentIds');
    }
    if (this._shipmentIds.length > DISPATCH.MAX_ITEMS_PER_DISPATCH) {
      throw new ValidationError(
        `Shipment count exceeds max ${DISPATCH.MAX_ITEMS_PER_DISPATCH}`,
        'shipmentIds',
      );
    }
    if (this._itemCount < this._shipmentIds.length) {
      throw new ValidationError('itemCount must be ≥ shipment count', 'itemCount');
    }
  }

  get dispatchNumber(): DispatchNumberVO { return this._dispatchNumber; }
  get status(): DispatchStatusVO { return this._status; }
  get type(): DispatchTypeVO { return this._type; }
  get shipmentIds(): readonly string[] { return this._shipmentIds; }
  get courierId(): CourierIdVO | undefined { return this._courierId; }
  get vehicleId(): VehicleIdVO | undefined { return this._vehicleId; }
  get driverId(): DriverIdVO | undefined { return this._driverId; }
  get warehouseId(): WarehouseIdVO | undefined { return this._warehouseId; }
  get manifestUrl(): string | undefined { return this._manifestUrl; }
  get itemCount(): number { return this._itemCount; }
  get totalWeight(): WeightKgVO | undefined { return this._totalWeight; }
  get dispatchedAt(): string | undefined { return this._dispatchedAt; }
  get estimatedArrivalAt(): string | undefined { return this._estimatedArrivalAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get notes(): NotesVO | undefined { return this._notes; }
  get toIdVO(): DispatchIdVO { return DispatchIdVO.reconstitute(this.id); }

  get shipmentCount(): number { return this._shipmentIds.length; }
  get hasCourier(): boolean { return this._courierId !== undefined; }
  get hasVehicle(): boolean { return this._vehicleId !== undefined; }
  get hasDriver(): boolean { return this._driverId !== undefined; }
  get hasManifest(): boolean { return this._manifestUrl !== undefined; }

  isPending(): boolean { return this._status.isPending(); }
  isAssigned(): boolean { return this._status.isAssigned(); }
  isDispatched(): boolean { return this._status.isDispatched(); }
  isInTransit(): boolean { return this._status.isInTransit(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isReturned(): boolean { return this._status.isReturned(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isInFlight(): boolean { return this._status.isInFlight(); }

  canBeAssigned(): boolean { return this._status.canBeAssigned(); }
  canBeStarted(): boolean { return this._status.canBeStarted() && this.hasCourier; }
  canBeCancelled(): boolean { return this._status.canBeCancelled(); }
  isReady(): boolean { return this.hasCourier && this.hasManifest && this.shipmentCount > 0; }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidDispatchStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  addShipment(shipmentId: string, items = 1, weightKg?: number, now: string = new Date().toISOString()): void {
    if (!this.isPending() && !this.isAssigned()) {
      throw new BusinessRuleError(
        `Cannot add shipment to dispatch in status "${this._status.value}"`,
        'DISPATCH_CANNOT_BE_MODIFIED',
        { dispatchId: this.id, status: this._status.value },
      );
    }
    if (this._shipmentIds.includes(shipmentId)) {
      throw new ValidationError(`Shipment "${shipmentId}" already in dispatch`, 'shipmentId');
    }
    if (this._shipmentIds.length >= DISPATCH.MAX_ITEMS_PER_DISPATCH) {
      throw new DispatchItemLimitExceededError(this._shipmentIds.length);
    }
    this._shipmentIds.push(shipmentId);
    this._itemCount += items;
    if (weightKg && this._totalWeight) {
      this._totalWeight = WeightKgVO.create(this._totalWeight.value + weightKg);
    } else if (weightKg) {
      this._totalWeight = WeightKgVO.create(weightKg);
    }
    this.addDomainEvent(new DispatchShipmentAddedEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, shipmentId, totalShipments: this._shipmentIds.length },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  removeShipment(shipmentId: string, items = 1, now: string = new Date().toISOString()): void {
    if (!this.isPending() && !this.isAssigned()) {
      throw new BusinessRuleError(
        `Cannot remove shipment from dispatch in status "${this._status.value}"`,
        'DISPATCH_CANNOT_BE_MODIFIED',
        { dispatchId: this.id, status: this._status.value },
      );
    }
    const idx = this._shipmentIds.indexOf(shipmentId);
    if (idx === -1) {
      throw new ValidationError(`Shipment "${shipmentId}" not in dispatch`, 'shipmentId');
    }
    this._shipmentIds.splice(idx, 1);
    this._itemCount = Math.max(0, this._itemCount - items);
    this.addDomainEvent(new DispatchShipmentRemovedEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, shipmentId, totalShipments: this._shipmentIds.length },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  assign(
    courierId: CourierIdVO,
    vehicleId?: VehicleIdVO,
    driverId?: DriverIdVO,
    warehouseId?: WarehouseIdVO,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeAssigned()) {
      throw new BusinessRuleError(
        `Cannot assign dispatch in status "${this._status.value}"`,
        'DISPATCH_CANNOT_BE_ASSIGNED',
        { dispatchId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('assigned');
    const from = this._status.value;
    this._courierId = courierId;
    if (vehicleId) this._vehicleId = vehicleId;
    if (driverId) this._driverId = driverId;
    if (warehouseId) this._warehouseId = warehouseId;
    this._status = DispatchStatusVO.assigned();
    this.addDomainEvent(new DispatchAssignedEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, fromStatus: from, toStatus: 'assigned' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  generateManifest(manifestUrl: string, now: string = new Date().toISOString()): void {
    if (!this.isPending() && !this.isAssigned()) {
      throw new BusinessRuleError('Cannot generate manifest for started dispatch', 'DISPATCH_ALREADY_STARTED', { dispatchId: this.id });
    }
    this._manifestUrl = manifestUrl;
    this.addDomainEvent(new DispatchManifestGeneratedEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, manifestUrl, generatedAt: now },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  start(now: string = new Date().toISOString()): void {
    if (this.isDispatched() || this.isInFlight()) {
      throw new DispatchAlreadyStartedError(this.id);
    }
    if (!this.canBeStarted()) {
      throw new BusinessRuleError(
        'Cannot start dispatch: courier not assigned or invalid status',
        'DISPATCH_NOT_READY',
        { dispatchId: this.id, hasCourier: this.hasCourier },
      );
    }
    this.assertTransitionTo('dispatched');
    const from = this._status.value;
    this._status = DispatchStatusVO.dispatched();
    this._dispatchedAt = now;
    this.addDomainEvent(new DispatchStartedEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, fromStatus: from, toStatus: 'dispatched' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markInTransit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = DispatchStatusVO.inTransit();
    this.addDomainEvent(new DispatchInTransitEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, fromStatus: from, toStatus: 'in_transit' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('delivered');
    const from = this._status.value;
    this._status = DispatchStatusVO.delivered();
    this._deliveredAt = now;
    this.addDomainEvent(new DispatchDeliveredEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, fromStatus: from, toStatus: 'delivered' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    const from = this._status.value;
    this._status = DispatchStatusVO.failed();
    this.addDomainEvent(new DispatchFailedEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, fromStatus: from, toStatus: 'failed', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markReturned(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('returned');
    const from = this._status.value;
    this._status = DispatchStatusVO.returned();
    this.addDomainEvent(new DispatchReturnedEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, fromStatus: from, toStatus: 'returned', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, now: string = new Date().toISOString()): void {
    if (this.isDelivered()) {
      throw new DispatchAlreadyCompletedError(this.id);
    }
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel dispatch in status "${this._status.value}"`,
        'DISPATCH_CANNOT_BE_CANCELLED',
        { dispatchId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = DispatchStatusVO.cancelled();
    this._cancelledAt = now;
    this.addDomainEvent(new DispatchCancelledEvent({
      aggregateId: this.id,
      payload: { dispatchId: this.id, fromStatus: from, toStatus: 'cancelled', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateEta(newEta: string, now: string = new Date().toISOString()): void {
    this._estimatedArrivalAt = newEta;
    this.touch(now);
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<DispatchEntityProps, 'status' | 'shipmentIds' | 'itemCount'> & {
      status?: DispatchStatusVO;
      shipmentIds?: readonly string[];
      itemCount?: number;
    };
    now: string;
  }): DispatchEntity {
    const status = params.props.status ?? DispatchStatusVO.pending();
    const shipmentIds = params.props.shipmentIds ?? [];
    const fullProps: DispatchEntityProps = {
      ...params.props,
      status,
      shipmentIds,
      itemCount: params.props.itemCount ?? shipmentIds.length,
    };
    const entity = new DispatchEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new DispatchCreatedEvent({
      aggregateId: params.id,
      payload: {
        dispatchId: params.id,
        dispatchNumber: fullProps.dispatchNumber.value,
        type: fullProps.type.value,
        shipmentCount: shipmentIds.length,
        itemCount: fullProps.itemCount,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: DispatchEntityProps; version?: number;
  }): DispatchEntity {
    const entity = new DispatchEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
