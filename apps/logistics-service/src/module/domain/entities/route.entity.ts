/**
 * RouteEntity — AGGREGATE ROOT (route plan + ordered stops)
 * @module logistics-service/domain/entities
 *
 * Business rules:
 *  - Max stops = ROUTE.MAX_STOPS (200)
 *  - Max distance = ROUTE.MAX_DISTANCE_KM (2000)
 *  - Max duration = ROUTE.MAX_DURATION_HOURS (12)
 *  - Stops must have unique order values (0-based contiguous)
 *  - Only draft/planned routes can be edited
 *  - Only planned/draft routes can start
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ROUTE } from '@vubon/shared-constants/logistics';

import { RouteIdVO } from '../value-objects/primitives/route-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { VehicleIdVO } from '../value-objects/primitives/vehicle-id.vo.js';
import { DriverIdVO } from '../value-objects/primitives/driver-id.vo.js';
import { RouteCodeVO } from '../value-objects/primitives/route-code.vo.js';
import { RouteStatusVO } from '../value-objects/primitives/route-status.vo.js';
import { RouteTypeVO } from '../value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '../value-objects/primitives/route-optimization.vo.js';
import { DistanceKmVO } from '../value-objects/primitives/distance-km.vo.js';
import { DurationMinutesVO } from '../value-objects/primitives/duration-minutes.vo.js';
import { RouteStopVO } from '../value-objects/composites/route-stop.vo.js';

import {
  RouteCreatedEvent,
  RouteStatusChangedEvent,
  RouteStartedEvent,
  RouteCompletedEvent,
  RouteCancelledEvent,
  RouteArchivedEvent,
  RouteStopsReorderedEvent,
  RouteStopAddedEvent,
  RouteStopRemovedEvent,
  RouteStopCompletedEvent,
  RouteOptimizationStartedEvent,
  RouteOptimizationCompletedEvent,
} from '../events/route.events.js';

import {
  InvalidRouteStatusTransitionError,
  RouteStopLimitExceededError,
  RouteDistanceLimitExceededError,
  RouteAlreadyStartedError,
  RouteInvalidStopOrderError,
} from '../errors/route.errors.js';

export interface RouteEntityProps {
  readonly name: string;
  readonly code: RouteCodeVO;
  readonly type: RouteTypeVO;
  readonly status: RouteStatusVO;
  readonly optimization: RouteOptimizationVO;
  readonly stops: readonly RouteStopVO[];
  readonly totalDistanceKm?: DistanceKmVO;
  readonly totalDurationMinutes?: DurationMinutesVO;
  readonly warehouseId?: WarehouseIdVO;
  readonly vehicleId?: VehicleIdVO;
  readonly driverId?: DriverIdVO;
  readonly scheduledDate: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly isOptimized: boolean;
  readonly isRecurring: boolean;
  readonly recurrenceRule?: string;
}

export class RouteEntity extends AggregateRoot<string> {
  private _status: RouteStatusVO;
  private _stops: RouteStopVO[];
  private _totalDistanceKm?: DistanceKmVO;
  private _totalDurationMinutes?: DurationMinutesVO;
  private _vehicleId?: VehicleIdVO;
  private _driverId?: DriverIdVO;
  private _startedAt?: string;
  private _completedAt?: string;
  private _isOptimized: boolean;

  private readonly _name: string;
  private readonly _code: RouteCodeVO;
  private readonly _type: RouteTypeVO;
  private readonly _optimization: RouteOptimizationVO;
  private readonly _warehouseId?: WarehouseIdVO;
  private readonly _scheduledDate: string;
  private readonly _isRecurring: boolean;
  private readonly _recurrenceRule?: string;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: RouteEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._code = props.code;
    this._type = props.type;
    this._status = props.status;
    this._optimization = props.optimization;
    this._stops = [...props.stops];
    this._totalDistanceKm = props.totalDistanceKm;
    this._totalDurationMinutes = props.totalDurationMinutes;
    this._warehouseId = props.warehouseId;
    this._vehicleId = props.vehicleId;
    this._driverId = props.driverId;
    this._scheduledDate = props.scheduledDate;
    this._startedAt = props.startedAt;
    this._completedAt = props.completedAt;
    this._isOptimized = props.isOptimized;
    this._isRecurring = props.isRecurring;
    this._recurrenceRule = props.recurrenceRule;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._name.trim().length === 0) {
      throw new ValidationError('Route name required', 'name');
    }
    if (this._stops.length > ROUTE.MAX_STOPS) {
      throw new ValidationError(`Stops exceed max ${ROUTE.MAX_STOPS}`, 'stops');
    }
    const orders = this._stops.map((s) => s.order);
    const uniqueOrders = new Set(orders);
    if (uniqueOrders.size !== orders.length) {
      throw new ValidationError('Route stops must have unique order values', 'stops');
    }
    if (this._totalDistanceKm && this._totalDistanceKm.value > ROUTE.MAX_DISTANCE_KM) {
      throw new ValidationError(`Distance exceeds max ${ROUTE.MAX_DISTANCE_KM}km`, 'totalDistanceKm');
    }
    if (this._totalDurationMinutes && this._totalDurationMinutes.value > ROUTE.MAX_DURATION_HOURS * 60) {
      throw new ValidationError(`Duration exceeds max ${ROUTE.MAX_DURATION_HOURS}h`, 'totalDurationMinutes');
    }
  }

  get name(): string { return this._name; }
  get code(): RouteCodeVO { return this._code; }
  get type(): RouteTypeVO { return this._type; }
  get status(): RouteStatusVO { return this._status; }
  get optimization(): RouteOptimizationVO { return this._optimization; }
  get stops(): readonly RouteStopVO[] { return this._stops; }
  get totalDistanceKm(): DistanceKmVO | undefined { return this._totalDistanceKm; }
  get totalDurationMinutes(): DurationMinutesVO | undefined { return this._totalDurationMinutes; }
  get warehouseId(): WarehouseIdVO | undefined { return this._warehouseId; }
  get vehicleId(): VehicleIdVO | undefined { return this._vehicleId; }
  get driverId(): DriverIdVO | undefined { return this._driverId; }
  get scheduledDate(): string { return this._scheduledDate; }
  get startedAt(): string | undefined { return this._startedAt; }
  get completedAt(): string | undefined { return this._completedAt; }
  get isOptimized(): boolean { return this._isOptimized; }
  get isRecurring(): boolean { return this._isRecurring; }
  get recurrenceRule(): string | undefined { return this._recurrenceRule; }
  get toIdVO(): RouteIdVO { return RouteIdVO.reconstitute(this.id); }

  // ─── Predicates ───
  isDraft(): boolean { return this._status.isDraft(); }
  isPlanned(): boolean { return this._status.isPlanned(); }
  isActive(): boolean { return this._status.isActive(); }
  isCompleted(): boolean { return this._status.isCompleted(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isOptimizing(): boolean { return this._status.isOptimizing(); }
  isArchived(): boolean { return this._status.isArchived(); }
  isFinal(): boolean { return this._status.isFinal(); }

  get stopCount(): number { return this._stops.length; }
  get completedStops(): number { return this._stops.filter((s) => s.completed).length; }
  get remainingStops(): number { return this.stopCount - this.completedStops; }
  get hasVehicle(): boolean { return this._vehicleId !== undefined; }
  get hasDriver(): boolean { return this._driverId !== undefined; }
  get isReady(): boolean { return this.hasVehicle && this.hasDriver && this.stopCount > 0; }

  get progressPercent(): number {
    if (this.stopCount === 0) return 0;
    return Math.round((this.completedStops / this.stopCount) * 100);
  }

  get stopsSorted(): readonly RouteStopVO[] {
    return [...this._stops].sort((a, b) => a.order - b.order);
  }

  canBeEdited(): boolean { return this._status.canBeEdited(); }
  canBeStarted(): boolean {
    return this._status.canBeStarted() && this.isReady && !this.isOptimizing();
  }
  canBeOptimized(): boolean { return this._status.canBeOptimized(); }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidRouteStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ─── Business methods ───
  addStop(stop: RouteStopVO, now: string = new Date().toISOString()): void {
    if (!this.canBeEdited()) {
      throw new BusinessRuleError(
        `Cannot add stop to route in status "${this._status.value}"`,
        'ROUTE_CANNOT_BE_EDITED',
        { routeId: this.id, status: this._status.value },
      );
    }
    if (this._stops.length >= ROUTE.MAX_STOPS) {
      throw new RouteStopLimitExceededError(this._stops.length);
    }
    if (this._stops.some((s) => s.order === stop.order)) {
      throw new RouteInvalidStopOrderError(stop.id, stop.order);
    }
    this._stops.push(stop);
    this.addDomainEvent(new RouteStopAddedEvent({
      aggregateId: this.id,
      payload: {
        routeId: this.id,
        stopId: stop.id,
        order: stop.order,
        shipmentCount: stop.shipmentCount,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  removeStop(stopId: string, now: string = new Date().toISOString()): void {
    if (!this.canBeEdited()) {
      throw new BusinessRuleError(
        `Cannot remove stop from route in status "${this._status.value}"`,
        'ROUTE_CANNOT_BE_EDITED',
        { routeId: this.id, status: this._status.value },
      );
    }
    const idx = this._stops.findIndex((s) => s.id === stopId);
    if (idx === -1) {
      throw new ValidationError(`Stop "${stopId}" not found in route`, 'stopId');
    }
    this._stops.splice(idx, 1);
    this.addDomainEvent(new RouteStopRemovedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, stopId },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  /** Reorder stops using an array of stop IDs in the new desired order. */
  reorderStops(orderedStopIds: readonly string[], now: string = new Date().toISOString()): void {
    if (!this.canBeEdited()) {
      throw new BusinessRuleError(
        `Cannot reorder route in status "${this._status.value}"`,
        'ROUTE_CANNOT_BE_EDITED',
        { routeId: this.id, status: this._status.value },
      );
    }
    if (orderedStopIds.length !== this._stops.length) {
      throw new ValidationError('Reorder must include all stop IDs', 'orderedStopIds');
    }
    const byId = new Map(this._stops.map((s) => [s.id, s]));
    const reordered: RouteStopVO[] = [];
    orderedStopIds.forEach((id, idx) => {
      const original = byId.get(id);
      if (!original) throw new ValidationError(`Unknown stop ID "${id}"`, 'orderedStopIds');
      reordered.push(
        RouteStopVO.reconstitute({
          id: original.id,
          order: idx,
          location: original.location,
          address: original.address,
          latitude: original.latitude,
          longitude: original.longitude,
          shipmentIds: original.shipmentIds,
          estimatedArrivalAt: original.estimatedArrivalAt,
          actualArrivalAt: original.actualArrivalAt,
          completed: original.completed,
          notes: original.notes,
        }),
      );
    });
    this._stops = reordered;
    this.addDomainEvent(new RouteStopsReorderedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, stopCount: reordered.length, reorderedAt: now },
      version: this.version + 1,
    }));
    this._isOptimized = false;
    this.touch(now);
    this.incrementVersion();
  }

  completeStop(stopId: string, now: string = new Date().toISOString()): void {
    if (!this.isActive()) {
      throw new BusinessRuleError(
        `Cannot complete stop; route status is "${this._status.value}"`,
        'ROUTE_NOT_ACTIVE',
        { routeId: this.id, status: this._status.value },
      );
    }
    const idx = this._stops.findIndex((s) => s.id === stopId);
    if (idx === -1) throw new ValidationError(`Stop "${stopId}" not found`, 'stopId');
    const original = this._stops[idx]!;
    if (original.completed) return;
    this._stops[idx] = RouteStopVO.reconstitute({
      id: original.id,
      order: original.order,
      location: original.location,
      address: original.address,
      latitude: original.latitude,
      longitude: original.longitude,
      shipmentIds: original.shipmentIds,
      estimatedArrivalAt: original.estimatedArrivalAt,
      actualArrivalAt: now,
      completed: true,
      notes: original.notes,
    });
    this.addDomainEvent(new RouteStopCompletedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, stopId, completedAt: now },
      version: this.version + 1,
    }));
    if (this.completedStops === this.stopCount) {
      this._status = RouteStatusVO.completed();
      this._completedAt = now;
    }
    this.touch(now);
    this.incrementVersion();
  }

  startOptimization(now: string = new Date().toISOString()): void {
    if (!this.canBeOptimized()) {
      throw new BusinessRuleError(
        `Cannot optimize route in status "${this._status.value}"`,
        'ROUTE_CANNOT_BE_OPTIMIZED',
        { routeId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('optimizing');
    const from = this._status.value;
    this._status = RouteStatusVO.optimizing();
    this.addDomainEvent(new RouteOptimizationStartedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, fromStatus: from, toStatus: 'optimizing' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  completeOptimization(
    totalDistanceKm: number,
    totalDurationMinutes: number,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.isOptimizing()) {
      throw new BusinessRuleError('Route is not being optimized', 'ROUTE_NOT_OPTIMIZING', { routeId: this.id });
    }
    if (totalDistanceKm > ROUTE.MAX_DISTANCE_KM) {
      throw new RouteDistanceLimitExceededError(totalDistanceKm);
    }
    this._totalDistanceKm = DistanceKmVO.create(totalDistanceKm);
    this._totalDurationMinutes = DurationMinutesVO.create(totalDurationMinutes);
    this._isOptimized = true;
    this._status = RouteStatusVO.planned();
    this.addDomainEvent(new RouteOptimizationCompletedEvent({
      aggregateId: this.id,
      payload: {
        routeId: this.id,
        optimization: this._optimization.value,
        totalDistanceKm,
        totalDurationMinutes,
        optimizedAt: now,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  plan(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('planned');
    const from = this._status.value;
    this._status = RouteStatusVO.planned();
    this.addDomainEvent(new RouteStatusChangedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, fromStatus: from, toStatus: 'planned' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  start(now: string = new Date().toISOString()): void {
    if (!this.canBeStarted()) {
      if (this.isActive()) throw new RouteAlreadyStartedError(this.id);
      throw new BusinessRuleError(
        `Cannot start route in status "${this._status.value}"`,
        'ROUTE_CANNOT_BE_STARTED',
        { routeId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = RouteStatusVO.active();
    this._startedAt = now;
    this.addDomainEvent(new RouteStartedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, fromStatus: from, toStatus: 'active' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    if (!this.isActive()) {
      throw new BusinessRuleError(
        `Cannot complete route in status "${this._status.value}"`,
        'ROUTE_CANNOT_BE_COMPLETED',
        { routeId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('completed');
    const from = this._status.value;
    this._status = RouteStatusVO.completed();
    this._completedAt = now;
    this.addDomainEvent(new RouteCompletedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, fromStatus: from, toStatus: 'completed' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = RouteStatusVO.cancelled();
    this.addDomainEvent(new RouteCancelledEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, fromStatus: from, toStatus: 'cancelled', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  archive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this._status.value;
    this._status = RouteStatusVO.archived();
    this.addDomainEvent(new RouteArchivedEvent({
      aggregateId: this.id,
      payload: { routeId: this.id, fromStatus: from, toStatus: 'archived' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  assignVehicle(vehicleId: VehicleIdVO, now: string = new Date().toISOString()): void {
    if (!this.canBeEdited()) {
      throw new BusinessRuleError('Cannot change vehicle for non-editable route', 'ROUTE_CANNOT_BE_EDITED', { routeId: this.id });
    }
    this._vehicleId = vehicleId;
    this.touch(now);
    this.incrementVersion();
  }

  assignDriver(driverId: DriverIdVO, now: string = new Date().toISOString()): void {
    if (!this.canBeEdited()) {
      throw new BusinessRuleError('Cannot change driver for non-editable route', 'ROUTE_CANNOT_BE_EDITED', { routeId: this.id });
    }
    this._driverId = driverId;
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Factories ───
  static create(params: {
    id: string;
    props: Omit<RouteEntityProps, 'status' | 'stops' | 'isOptimized'> & {
      status?: RouteStatusVO;
      stops?: readonly RouteStopVO[];
      isOptimized?: boolean;
    };
    now: string;
  }): RouteEntity {
    const status = params.props.status ?? RouteStatusVO.draft();
    const fullProps: RouteEntityProps = {
      ...params.props,
      status,
      stops: params.props.stops ?? [],
      isOptimized: params.props.isOptimized ?? false,
    };
    const entity = new RouteEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new RouteCreatedEvent({
      aggregateId: params.id,
      payload: {
        routeId: params.id,
        code: fullProps.code.value,
        name: fullProps.name,
        type: fullProps.type.value,
        scheduledDate: fullProps.scheduledDate,
        totalStops: fullProps.stops.length,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: RouteEntityProps; version?: number;
  }): RouteEntity {
    const entity = new RouteEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
