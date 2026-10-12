/**
 * TrackingEntity — AGGREGATE ROOT (timeline of tracking events)
 * @module logistics-service/domain/entities
 *
 * Business rules:
 *  - Max events = TRACKING.MAX_EVENTS (500)
 *  - Cannot add events after final status (completed/expired)
 *  - Terminal events (delivered/failed/returned) auto-transition status
 *  - Events must be in chronological order (or stored as received)
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TRACKING } from '@vubon/shared-constants/logistics';

import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo.js';
import { TrackingEventVO } from '../value-objects/primitives/tracking-event.vo.js';
import { TrackingSourceVO } from '../value-objects/primitives/tracking-source.vo.js';
import { TrackingEventEntryVO } from '../value-objects/composites/tracking-event-entry.vo.js';

import {
  TrackingStartedEvent,
  TrackingEventRecordedEvent,
  TrackingCompletedEvent,
  TrackingFailedEvent,
  TrackingExpiredEvent,
  TrackingPublicAccessEnabledEvent,
  TrackingPublicAccessDisabledEvent,
} from '../events/tracking.events.js';

import {
  TrackingEventLimitExceededError,
  TrackingFinalizedError,
} from '../errors/tracking.errors.js';

export interface TrackingEntityProps {
  readonly trackingNumber: TrackingNumberVO;
  readonly shipmentId?: ShipmentIdVO;
  readonly orderId?: OrderIdVO;
  readonly courierCode?: string;
  readonly status: TrackingStatusVO;
  readonly currentLocation?: string;
  readonly estimatedDeliveryAt?: string;
  readonly events: readonly TrackingEventEntryVO[];
  readonly publicAccess: boolean;
  readonly lastUpdatedAt: string;
}

export class TrackingEntity extends AggregateRoot<string> {
  private _status: TrackingStatusVO;
  private _currentLocation?: string;
  private _estimatedDeliveryAt?: string;
  private _events: TrackingEventEntryVO[];
  private _publicAccess: boolean;
  private _lastUpdatedAt: string;

  private readonly _trackingNumber: TrackingNumberVO;
  private readonly _shipmentId?: ShipmentIdVO;
  private readonly _orderId?: OrderIdVO;
  private readonly _courierCode?: string;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: TrackingEntityProps, deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._trackingNumber = props.trackingNumber;
    this._shipmentId = props.shipmentId;
    this._orderId = props.orderId;
    this._courierCode = props.courierCode;
    this._status = props.status;
    this._currentLocation = props.currentLocation;
    this._estimatedDeliveryAt = props.estimatedDeliveryAt;
    this._events = [...props.events];
    this._publicAccess = props.publicAccess;
    this._lastUpdatedAt = props.lastUpdatedAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._events.length > TRACKING.MAX_EVENTS) {
      throw new ValidationError(`Events exceed max ${TRACKING.MAX_EVENTS}`, 'events');
    }
  }

  get trackingNumber(): TrackingNumberVO { return this._trackingNumber; }
  get shipmentId(): ShipmentIdVO | undefined { return this._shipmentId; }
  get orderId(): OrderIdVO | undefined { return this._orderId; }
  get courierCode(): string | undefined { return this._courierCode; }
  get status(): TrackingStatusVO { return this._status; }
  get currentLocation(): string | undefined { return this._currentLocation; }
  get estimatedDeliveryAt(): string | undefined { return this._estimatedDeliveryAt; }
  get events(): readonly TrackingEventEntryVO[] { return this._events; }
  get publicAccess(): boolean { return this._publicAccess; }
  get lastUpdatedAt(): string { return this._lastUpdatedAt; }
  get toIdVO(): TrackingIdVO { return TrackingIdVO.reconstitute(this.id); }

  // ─── Predicates ───
  isPending(): boolean { return this._status.isPending(); }
  isActive(): boolean { return this._status.isActive(); }
  isCompleted(): boolean { return this._status.isCompleted(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isFinal(): boolean { return this._status.isFinal(); }

  get eventCount(): number { return this._events.length; }
  get remainingEvents(): number { return TRACKING.MAX_EVENTS - this._events.length; }
  get currentEvent(): TrackingEventEntryVO | undefined { return this._events[this._events.length - 1]; }
  get isPublic(): boolean { return this._publicAccess; }

  acceptsEvents(): boolean {
    return this._status.acceptsEvents() && this._events.length < TRACKING.MAX_EVENTS;
  }

  /** Events sorted by occurredAt ascending. */
  get eventsSorted(): readonly TrackingEventEntryVO[] {
    return [...this._events].sort(
      (a, b) => new Date(a.occurredAt).getTime() - new Date(b.occurredAt).getTime(),
    );
  }

  /** Total minutes in transit (first event → delivered/failed). */
  get transitDurationMinutes(): number | null {
    if (this._events.length < 2) return null;
    const sorted = this.eventsSorted;
    const first = sorted[0]!;
    const last = sorted[sorted.length - 1]!;
    return Math.round(
      (new Date(last.occurredAt).getTime() - new Date(first.occurredAt).getTime()) / 60000,
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this._lastUpdatedAt = now;
  }

  // ─── Business methods ───
  /** Record a new tracking event. Auto-transitions status for terminal events. */
  recordEvent(input: {
    id: string;
    event: string;
    status?: string;
    source: string;
    message: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    occurredAt?: string;
    metadata?: Readonly<Record<string, unknown>>;
    now?: string;
  }): TrackingEventEntryVO {
    if (this.isFinal()) {
      throw new TrackingFinalizedError(this._trackingNumber.value);
    }
    if (this._events.length >= TRACKING.MAX_EVENTS) {
      throw new TrackingEventLimitExceededError(this._trackingNumber.value, this._events.length);
    }
    const now = input.now ?? new Date().toISOString();
    const occurredAt = input.occurredAt ?? now;
    const statusValue = input.status ?? this._status.value;
    const entry = TrackingEventEntryVO.create({
      id: input.id,
      shipmentId: this._shipmentId?.value,
      orderId: this._orderId?.value,
      event: input.event,
      status: statusValue,
      source: input.source,
      message: input.message,
      location: input.location,
      latitude: input.latitude,
      longitude: input.longitude,
      occurredAt,
      receivedAt: now,
      metadata: input.metadata,
    });
    this._events.push(entry);
    if (entry.location) this._currentLocation = entry.location;

    const eventVO = TrackingEventVO.reconstitute(input.event);
    if (eventVO.isTerminal()) {
      if (eventVO.isDelivered()) {
        this._status = TrackingStatusVO.completed();
        this.addDomainEvent(new TrackingCompletedEvent({
          aggregateId: this.id,
          payload: { trackingNumber: this._trackingNumber.value, fromStatus: statusValue, toStatus: 'completed' },
          version: this.version + 1,
        }));
      } else if (eventVO.isFailed()) {
        this._status = TrackingStatusVO.failed();
        this.addDomainEvent(new TrackingFailedEvent({
          aggregateId: this.id,
          payload: { trackingNumber: this._trackingNumber.value, fromStatus: statusValue, toStatus: 'failed' },
          version: this.version + 1,
        }));
      } else if (eventVO.isReturned()) {
        this._status = TrackingStatusVO.completed();
      }
    } else if (this._status.isPending()) {
      this._status = TrackingStatusVO.active();
    }

    this.addDomainEvent(new TrackingEventRecordedEvent({
      aggregateId: this.id,
      payload: {
        trackingNumber: this._trackingNumber.value,
        eventId: entry.id,
        event: entry.event.value,
        status: entry.status.value,
        source: entry.source.value,
        message: entry.message,
        location: entry.location,
        occurredAt: entry.occurredAt,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
    return entry;
  }

  updateEstimatedDelivery(newEta: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new TrackingFinalizedError(this._trackingNumber.value);
    }
    this._estimatedDeliveryAt = newEta;
    this.touch(now);
    this.incrementVersion();
  }

  markCompleted(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('completed')) {
      throw new BusinessRuleError(
        `Cannot complete tracking from status "${this._status.value}"`,
        'TRACKING_CANNOT_BE_COMPLETED',
        { trackingNumber: this._trackingNumber.value, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = TrackingStatusVO.completed();
    this.addDomainEvent(new TrackingCompletedEvent({
      aggregateId: this.id,
      payload: { trackingNumber: this._trackingNumber.value, fromStatus: from, toStatus: 'completed' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('expired')) {
      throw new BusinessRuleError(
        `Cannot expire tracking from status "${this._status.value}"`,
        'TRACKING_CANNOT_BE_EXPIRED',
        { trackingNumber: this._trackingNumber.value, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = TrackingStatusVO.expired();
    this.addDomainEvent(new TrackingExpiredEvent({
      aggregateId: this.id,
      payload: { trackingNumber: this._trackingNumber.value, fromStatus: from, toStatus: 'expired' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  enablePublicAccess(now: string = new Date().toISOString()): void {
    if (this._publicAccess) return;
    this._publicAccess = true;
    this.addDomainEvent(new TrackingPublicAccessEnabledEvent({
      aggregateId: this.id,
      payload: { trackingNumber: this._trackingNumber.value, fromStatus: 'private', toStatus: 'public' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  disablePublicAccess(now: string = new Date().toISOString()): void {
    if (!this._publicAccess) return;
    this._publicAccess = false;
    this.addDomainEvent(new TrackingPublicAccessDisabledEvent({
      aggregateId: this.id,
      payload: { trackingNumber: this._trackingNumber.value, fromStatus: 'public', toStatus: 'private' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Factories ───
  static start(params: {
    id: string;
    trackingNumber: TrackingNumberVO;
    shipmentId?: ShipmentIdVO;
    orderId?: OrderIdVO;
    courierCode?: string;
    now: string;
  }): TrackingEntity {
    const props: TrackingEntityProps = {
      trackingNumber: params.trackingNumber,
      shipmentId: params.shipmentId,
      orderId: params.orderId,
      courierCode: params.courierCode,
      status: TrackingStatusVO.pending(),
      events: [],
      publicAccess: TRACKING.PUBLIC_TRACKING_ENABLED,
      lastUpdatedAt: params.now,
    };
    const entity = new TrackingEntity(params.id, params.now, params.now, props);
    entity.addDomainEvent(new TrackingStartedEvent({
      aggregateId: params.id,
      payload: {
        trackingNumber: params.trackingNumber.value,
        shipmentId: params.shipmentId?.value,
        orderId: params.orderId?.value,
        courierCode: params.courierCode,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: TrackingEntityProps; version?: number;
  }): TrackingEntity {
    const entity = new TrackingEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
