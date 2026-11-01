/**
 * TrackingEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * State machine:
 *   pending → active → completed ✓ (final)
 *   active → failed ✓ (final)
 *   active → expired ✓ (final)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TRACKING } from '@vubon/shared-constants/logistics';

import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo.js';
import { TrackingSourceVO } from '../value-objects/primitives/tracking-source.vo.js';

import {
  TrackingCreatedEvent,
  TrackingUpdatedEvent,
  TrackingCompletedEvent,
  TrackingFailedEvent,
  TrackingExpiredEvent,
  TrackingEventAddedEvent,
} from '../events/tracking.events.js';

export interface TrackingEntityProps {
  readonly trackingNumber: TrackingNumberVO;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly courierCode?: string;
  readonly status: TrackingStatusVO;
  readonly source: TrackingSourceVO;
  readonly currentEvent?: string;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly expiresAt?: string;
  readonly eventCount: number;
  readonly lastUpdatedAt: string;
  readonly completedAt?: string;
  readonly failedAt?: string;
  readonly expiredAt?: string;
  readonly failureReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class TrackingEntity extends AggregateRoot<string> {
  private _status: TrackingStatusVO;
  private _currentEvent?: string;
  private _currentLocation?: string;
  private _estimatedDeliveryAt?: string;
  private _expiresAt?: string;
  private _eventCount: number;
  private _lastUpdatedAt: string;
  private _completedAt?: string;
  private _failedAt?: string;
  private _expiredAt?: string;
  private _failureReason?: string;

  private readonly _trackingNumber: TrackingNumberVO;
  private readonly _shipmentId?: string;
  private readonly _orderId?: string;
  private readonly _courierCode?: string;
  private readonly _source: TrackingSourceVO;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: TrackingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._trackingNumber = props.trackingNumber;
    this._shipmentId = props.shipmentId;
    this._orderId = props.orderId;
    this._courierCode = props.courierCode;
    this._status = props.status;
    this._source = props.source;
    this._currentEvent = props.currentEvent;
    this._currentLocation = props.currentLocation;
    this._estimatedDeliveryAt = props.estimatedDeliveryAt;
    this._expiresAt = props.expiresAt;
    this._eventCount = props.eventCount;
    this._lastUpdatedAt = props.lastUpdatedAt;
    this._completedAt = props.completedAt;
    this._failedAt = props.failedAt;
    this._expiredAt = props.expiredAt;
    this._failureReason = props.failureReason;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._eventCount < 0) {
      throw new ValidationError('Event count cannot be negative', 'eventCount');
    }
    if (this._eventCount > TRACKING.MAX_EVENTS) {
      throw new ValidationError(
        `Event count ${this._eventCount} exceeds max ${TRACKING.MAX_EVENTS}`,
        'eventCount',
      );
    }
    if (!this._lastUpdatedAt) {
      throw new ValidationError('Last updated timestamp required', 'lastUpdatedAt');
    }
  }

  get trackingNumber(): TrackingNumberVO { return this._trackingNumber; }
  get shipmentId(): string | undefined { return this._shipmentId; }
  get orderId(): string | undefined { return this._orderId; }
  get courierCode(): string | undefined { return this._courierCode; }
  get status(): TrackingStatusVO { return this._status; }
  get source(): TrackingSourceVO { return this._source; }
  get currentEvent(): string | undefined { return this._currentEvent; }
  get currentLocation(): string | undefined { return this._currentLocation; }
  get estimatedDeliveryAt(): string | undefined { return this._estimatedDeliveryAt; }
  get expiresAt(): string | undefined { return this._expiresAt; }
  get eventCount(): number { return this._eventCount; }
  get lastUpdatedAt(): string { return this._lastUpdatedAt; }
  get completedAt(): string | undefined { return this._completedAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get expiredAt(): string | undefined { return this._expiredAt; }
  get failureReason(): string | undefined { return this._failureReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): TrackingIdVO { return TrackingIdVO.reconstitute(this.id); }

  isPending(): boolean { return this._status.isPending(); }
  isActive(): boolean { return this._status.isActive(); }
  isCompleted(): boolean { return this._status.isCompleted(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isTrackable(): boolean { return this._status.isTrackable(); }

  canAcceptEvents(): boolean {
    return !this._status.isFinal() && this._eventCount < TRACKING.MAX_EVENTS;
  }

  // ═══ Business Actions ═══
  activate(now: string = new Date().toISOString()): void {
    if (!this.isPending()) {
      throw new BusinessRuleError(
        `Cannot activate tracking in status "${this._status.value}"`,
        'TRACKING_CANNOT_BE_ACTIVATED',
        { trackingId: this.id, status: this._status.value },
      );
    }
    this._status = TrackingStatusVO.active();
    this.touch(now);
    this.incrementVersion();
  }

  addEvent(
    params: {
      eventId: string;
      eventType: string;
      eventStatus: string;
      currentLocation?: string;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canAcceptEvents()) {
      throw new BusinessRuleError(
        `Tracking cannot accept events (status "${this._status.value}", count ${this._eventCount}/${TRACKING.MAX_EVENTS})`,
        'MAX_TRACKING_EVENTS_EXCEEDED',
        { trackingId: this.id, eventCount: this._eventCount },
      );
    }
    this._eventCount += 1;
    this._currentEvent = params.eventType;
    if (params.currentLocation) {
      this._currentLocation = params.currentLocation;
    }
    this._lastUpdatedAt = now;

    this.addDomainEvent(
      new TrackingEventAddedEvent({
        aggregateId: this.id,
        payload: {
          trackingId: this.id,
          trackingNumber: this._trackingNumber.value,
          eventId: params.eventId,
          eventType: params.eventType,
          eventStatus: params.eventStatus,
          occurredAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new TrackingUpdatedEvent({
        aggregateId: this.id,
        payload: {
          trackingId: this.id,
          trackingNumber: this._trackingNumber.value,
          currentEvent: params.eventType,
          currentLocation: this._currentLocation,
          updatedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    if (!this.isActive()) {
      throw new BusinessRuleError(
        `Cannot complete tracking in status "${this._status.value}"`,
        'TRACKING_CANNOT_BE_COMPLETED',
        { trackingId: this.id, status: this._status.value },
      );
    }
    this._status = TrackingStatusVO.create('completed');
    this._completedAt = now;
    this.addDomainEvent(
      new TrackingCompletedEvent({
        aggregateId: this.id,
        payload: {
          trackingId: this.id,
          trackingNumber: this._trackingNumber.value,
          completedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    if (!this.isActive()) {
      throw new BusinessRuleError(
        `Cannot mark failed tracking in status "${this._status.value}"`,
        'TRACKING_CANNOT_BE_FAILED',
        { trackingId: this.id, status: this._status.value },
      );
    }
    this._status = TrackingStatusVO.create('failed');
    this._failedAt = now;
    this._failureReason = reason;
    this.addDomainEvent(
      new TrackingFailedEvent({
        aggregateId: this.id,
        payload: {
          trackingId: this.id,
          trackingNumber: this._trackingNumber.value,
          reason,
          failedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Tracking already final (status "${this._status.value}")`,
        'TRACKING_ALREADY_FINAL',
        { trackingId: this.id, status: this._status.value },
      );
    }
    this._status = TrackingStatusVO.create('expired');
    this._expiredAt = now;
    this.addDomainEvent(
      new TrackingExpiredEvent({
        aggregateId: this.id,
        payload: {
          trackingId: this.id,
          trackingNumber: this._trackingNumber.value,
          expiredAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: TrackingIdVO;
    props: Omit<TrackingEntityProps, 'status' | 'eventCount' | 'lastUpdatedAt'>;
    now: string;
  }): TrackingEntity {
    const entity = new TrackingEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: TrackingStatusVO.create('pending'),
        eventCount: 0,
        lastUpdatedAt: params.now,
      },
    );
    entity.addDomainEvent(
      new TrackingCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          trackingId: params.id.value,
          trackingNumber: params.props.trackingNumber.value,
          shipmentId: params.props.shipmentId,
          courierCode: params.props.courierCode,
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
    props: TrackingEntityProps;
    version?: number;
  }): TrackingEntity {
    const entity = new TrackingEntity(
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
