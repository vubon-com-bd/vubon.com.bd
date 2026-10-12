/**
 * TrackingEventEntryVO — one entry in the tracking timeline
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TrackingEventVO } from '../primitives/tracking-event.vo.js';
import { TrackingStatusVO } from '../primitives/tracking-status.vo.js';
import { TrackingSourceVO } from '../primitives/tracking-source.vo.js';

export interface TrackingEventEntryValue {
  readonly id: string;
  readonly shipmentId?: string;
  readonly orderId?: string;
  readonly event: TrackingEventVO;
  readonly status: TrackingStatusVO;
  readonly source: TrackingSourceVO;
  readonly message: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly occurredAt: string;
  readonly receivedAt: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class TrackingEventEntryVO extends BaseVO<TrackingEventEntryValue> {
  private constructor(value: TrackingEventEntryValue) { super(value); }

  static create(input: {
    id: string;
    shipmentId?: string;
    orderId?: string;
    event: string;
    status: string;
    source: string;
    message: string;
    location?: string;
    latitude?: number;
    longitude?: number;
    occurredAt: string;
    receivedAt: string;
    metadata?: Readonly<Record<string, unknown>>;
  }): TrackingEventEntryVO {
    if (!input.id || input.id.trim().length === 0) {
      throw new ValidationError('TrackingEventEntry id required', 'id');
    }
    if (!input.message || input.message.trim().length === 0) {
      throw new ValidationError('Tracking event message required', 'message');
    }
    if (input.message.length > 500) {
      throw new ValidationError('Tracking message max 500 chars', 'message');
    }
    if (input.latitude !== undefined && (input.latitude < -90 || input.latitude > 90)) {
      throw new ValidationError('latitude out of range', 'latitude');
    }
    if (input.longitude !== undefined && (input.longitude < -180 || input.longitude > 180)) {
      throw new ValidationError('longitude out of range', 'longitude');
    }
    return new TrackingEventEntryVO({
      id: input.id.trim(),
      shipmentId: input.shipmentId,
      orderId: input.orderId,
      event: TrackingEventVO.create(input.event),
      status: TrackingStatusVO.create(input.status),
      source: TrackingSourceVO.create(input.source),
      message: input.message.trim(),
      location: input.location,
      latitude: input.latitude,
      longitude: input.longitude,
      occurredAt: input.occurredAt,
      receivedAt: input.receivedAt,
      metadata: input.metadata,
    });
  }

  static reconstitute(value: TrackingEventEntryValue): TrackingEventEntryVO {
    return new TrackingEventEntryVO(value);
  }

  get id(): string { return this.value.id; }
  get shipmentId(): string | undefined { return this.value.shipmentId; }
  get orderId(): string | undefined { return this.value.orderId; }
  get event(): TrackingEventVO { return this.value.event; }
  get status(): TrackingStatusVO { return this.value.status; }
  get source(): TrackingSourceVO { return this.value.source; }
  get message(): string { return this.value.message; }
  get location(): string | undefined { return this.value.location; }
  get latitude(): number | undefined { return this.value.latitude; }
  get longitude(): number | undefined { return this.value.longitude; }
  get occurredAt(): string { return this.value.occurredAt; }
  get receivedAt(): string { return this.value.receivedAt; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this.value.metadata; }

  hasGeo(): boolean {
    return this.value.latitude !== undefined && this.value.longitude !== undefined;
  }

  isTerminal(): boolean { return this.value.event.isTerminal(); }
}
