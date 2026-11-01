/**
 * RouteEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ROUTE } from '@vubon/shared-constants/logistics';

import { RouteIdVO } from '../value-objects/primitives/route-id.vo.js';
import { RouteNameVO } from '../value-objects/primitives/route-name.vo.js';
import { RouteStatusVO } from '../value-objects/primitives/route-status.vo.js';
import { RouteTypeVO } from '../value-objects/primitives/route-type.vo.js';
import { RouteOptimizationVO } from '../value-objects/primitives/route-optimization.vo.js';

import {
  RouteCreatedEvent,
  RoutePlannedEvent,
  RouteOptimizedEvent,
  RouteStartedEvent,
  RouteStopCompletedEvent,
  RouteCompletedEvent,
  RouteCancelledEvent,
  RouteArchivedEvent,
  RouteStatusChangedEvent,
} from '../events/route.events.js';

export interface RouteStopEntity {
  readonly id: string;
  readonly order: number;
  readonly location: string;
  readonly address: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly shipmentIds: readonly string[];
  readonly estimatedArrivalAt?: string;
  readonly actualArrivalAt?: string;
  readonly completed: boolean;
  readonly notes?: string;
}

export interface RouteEntityProps {
  readonly name: RouteNameVO;
  readonly code: string;
  readonly type: RouteTypeVO;
  readonly status: RouteStatusVO;
  readonly optimization: RouteOptimizationVO;
  readonly stops: readonly RouteStopEntity[];
  readonly totalDistanceKm?: number;
  readonly totalDurationMinutes?: number;
  readonly warehouseId?: string;
  readonly vehicleId?: string;
  readonly driverId?: string;
  readonly scheduledDate: string;
  readonly startedAt?: string;
  readonly completedAt?: string;
  readonly cancelledAt?: string;
  readonly archivedAt?: string;
  readonly cancelReason?: string;
  readonly isOptimized: boolean;
  readonly isRecurring: boolean;
  readonly recurrenceRule?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class RouteEntity extends AggregateRoot<string> {
  private _status: RouteStatusVO;
  private _stops: RouteStopEntity[];
  private _totalDistanceKm?: number;
  private _totalDurationMinutes?: number;
  private _vehicleId?: string;
  private _driverId?: string;
  private _startedAt?: string;
  private _completedAt?: string;
  private _cancelledAt?: string;
  private _archivedAt?: string;
  private _cancelReason?: string;
  private _isOptimized: boolean;

  private readonly _name: RouteNameVO;
  private readonly _code: string;
  private readonly _type: RouteTypeVO;
  private readonly _optimization: RouteOptimizationVO;
  private readonly _warehouseId?: string;
  private readonly _scheduledDate: string;
  private readonly _isRecurring: boolean;
  private readonly _recurrenceRule?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: RouteEntityProps,
    deletedAt?: string | null,
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
    this._cancelledAt = props.cancelledAt;
    this._archivedAt = props.archivedAt;
    this._cancelReason = props.cancelReason;
    this._isOptimized = props.isOptimized;
    this._isRecurring = props.isRecurring;
    this._recurrenceRule = props.recurrenceRule;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._code || this._code.trim().length === 0) {
      throw new ValidationError('Code required', 'code');
    }
    if (this._stops.length === 0) {
      throw new ValidationError('Route must have at least one stop', 'stops');
    }
    if (this._stops.length > ROUTE.MAX_STOPS) {
      throw new ValidationError(
        `Route has ${this._stops.length} stops, exceeds max ${ROUTE.MAX_STOPS}`,
        'stops',
      );
    }
    if (
      this._totalDistanceKm !== undefined &&
      this._totalDistanceKm > ROUTE.MAX_DISTANCE_KM
    ) {
      throw new ValidationError(
        `Total distance ${this._totalDistanceKm}km exceeds max ${ROUTE.MAX_DISTANCE_KM}km`,
        'totalDistanceKm',
      );
    }
  }

  get name(): RouteNameVO { return this._name; }
  get code(): string { return this._code; }
  get type(): RouteTypeVO { return this._type; }
  get status(): RouteStatusVO { return this._status; }
  get optimization(): RouteOptimizationVO { return this._optimization; }
  get stops(): readonly RouteStopEntity[] { return this._stops; }
  get totalDistanceKm(): number | undefined { return this._totalDistanceKm; }
  get totalDurationMinutes(): number | undefined { return this._totalDurationMinutes; }
  get warehouseId(): string | undefined { return this._warehouseId; }
  get vehicleId(): string | undefined { return this._vehicleId; }
  get driverId(): string | undefined { return this._driverId; }
  get scheduledDate(): string { return this._scheduledDate; }
  get startedAt(): string | undefined { return this._startedAt; }
  get completedAt(): string | undefined { return this._completedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get archivedAt(): string | undefined { return this._archivedAt; }
  get cancelReason(): string | undefined { return this._cancelReason; }
  get isOptimized(): boolean { return this._isOptimized; }
  get isRecurring(): boolean { return this._isRecurring; }
  get recurrenceRule(): string | undefined { return this._recurrenceRule; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): RouteIdVO { return RouteIdVO.reconstitute(this.id); }

  isDraft(): boolean { return this._status.isDraft(); }
  isPlanned(): boolean { return this._status.isPlanned(); }
  isActive(): boolean { return this._status.isActive(); }
  isCompleted(): boolean { return this._status.isCompleted(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isArchived(): boolean { return this._status.isArchived(); }
  isFinal(): boolean { return this._status.isFinal(); }

  get stopCount(): number { return this._stops.length; }
  get completedStops(): number { return this._stops.filter((s) => s.completed).length; }
  get progress(): number {
    if (this._stops.length === 0) return 0;
    return (this.completedStops / this._stops.length) * 100;
  }

  getAllShipmentIds(): readonly string[] {
    return this._stops.flatMap((s) => s.shipmentIds);
  }

  hasDriver(): boolean { return !!this._driverId; }
  hasVehicle(): boolean { return !!this._vehicleId; }

  canBeModified(): boolean {
    return this.isDraft() || this.isPlanned();
  }

  // ═══ Business Actions ═══
  plan(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('planned');
    const from = this._status.value;
    this._status = RouteStatusVO.create('planned');
    this.emitStatusChange(from, 'planned');
    this.addDomainEvent(
      new RoutePlannedEvent({
        aggregateId: this.id,
        payload: { routeId: this.id, scheduledDate: this._scheduledDate, plannedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  optimize(
    newDistanceKm?: number,
    newDurationMinutes?: number,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeModified()) {
      throw new BusinessRuleError(
        `Cannot optimize route in status "${this._status.value}"`,
        'ROUTE_CANNOT_BE_MODIFIED',
        { routeId: this.id, status: this._status.value },
      );
    }
    const previousDistance = this._totalDistanceKm;
    if (newDistanceKm !== undefined) this._totalDistanceKm = newDistanceKm;
    if (newDurationMinutes !== undefined) this._totalDurationMinutes = newDurationMinutes;
    this._isOptimized = true;
    this.addDomainEvent(
      new RouteOptimizedEvent({
        aggregateId: this.id,
        payload: {
          routeId: this.id,
          optimization: this._optimization.value,
          previousDistanceKm: previousDistance,
          newDistanceKm: this._totalDistanceKm,
          optimizedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  start(
    driverId?: string,
    vehicleId?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (this._startedAt) {
      throw new BusinessRuleError(
        `Route already started at ${this._startedAt}`,
        'ROUTE_ALREADY_STARTED',
        { routeId: this.id },
      );
    }
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = RouteStatusVO.create('active');
    this._startedAt = now;
    if (driverId) this._driverId = driverId;
    if (vehicleId) this._vehicleId = vehicleId;
    this.emitStatusChange(from, 'active');
    this.addDomainEvent(
      new RouteStartedEvent({
        aggregateId: this.id,
        payload: { routeId: this.id, startedAt: now, driverId, vehicleId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  completeStop(stopId: string, now: string = new Date().toISOString()): void {
    if (!this.isActive()) {
      throw new BusinessRuleError(
        `Cannot complete stop in status "${this._status.value}"`,
        'ROUTE_NOT_ACTIVE',
        { routeId: this.id, status: this._status.value },
      );
    }
    const idx = this._stops.findIndex((s) => s.id === stopId);
    if (idx === -1) {
      throw new BusinessRuleError(
        `Stop "${stopId}" not found in route`,
        'ROUTE_STOP_NOT_FOUND',
        { routeId: this.id, stopId },
      );
    }
    const stop = this._stops[idx];
    if (stop.completed) {
      throw new BusinessRuleError(
        `Stop "${stopId}" already completed`,
        'ROUTE_STOP_ALREADY_COMPLETED',
        { routeId: this.id, stopId },
      );
    }
    this._stops[idx] = {
      ...stop,
      completed: true,
      actualArrivalAt: now,
    };
    this.addDomainEvent(
      new RouteStopCompletedEvent({
        aggregateId: this.id,
        payload: { routeId: this.id, stopId, stopOrder: stop.order, completedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    if (this._completedAt) {
      throw new BusinessRuleError(
        `Route already completed at ${this._completedAt}`,
        'ROUTE_ALREADY_COMPLETED',
        { routeId: this.id },
      );
    }
    this.assertTransitionTo('completed');
    const from = this._status.value;
    this._status = RouteStatusVO.create('completed');
    this._completedAt = now;
    this.emitStatusChange(from, 'completed');
    this.addDomainEvent(
      new RouteCompletedEvent({
        aggregateId: this.id,
        payload: {
          routeId: this.id,
          completedAt: now,
          totalStops: this._stops.length,
          completedStops: this.completedStops,
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
    this._status = RouteStatusVO.create('cancelled');
    this._cancelledAt = now;
    this._cancelReason = reason;
    this.emitStatusChange(from, 'cancelled', reason);
    this.addDomainEvent(
      new RouteCancelledEvent({
        aggregateId: this.id,
        payload: { routeId: this.id, reason, cancelledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  archive(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('archived');
    const from = this._status.value;
    this._status = RouteStatusVO.create('archived');
    this._archivedAt = now;
    this.emitStatusChange(from, 'archived');
    this.addDomainEvent(
      new RouteArchivedEvent({
        aggregateId: this.id,
        payload: { routeId: this.id, archivedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid route status transition: "${this._status.value}" → "${target}"`,
        'INVALID_ROUTE_STATUS_TRANSITION',
        { from: this._status.value, to: target, routeId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new RouteStatusChangedEvent({
        aggregateId: this.id,
        payload: { routeId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: RouteIdVO;
    props: Omit<RouteEntityProps, 'status' | 'isOptimized'>;
    now: string;
  }): RouteEntity {
    const entity = new RouteEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: RouteStatusVO.draft(),
        isOptimized: false,
      },
    );
    entity.addDomainEvent(
      new RouteCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          routeId: params.id.value,
          name: params.props.name.value,
          code: params.props.code,
          type: params.props.type.value,
          stopCount: params.props.stops.length,
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
    props: RouteEntityProps;
    version?: number;
  }): RouteEntity {
    const entity = new RouteEntity(
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
