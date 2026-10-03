/**
 * OrderTrackingEntity — tracking event history entry
 * @module order-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TrackingIdVO } from '../value-objects/primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '../value-objects/primitives/tracking-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';

export interface OrderTrackingEntityProps {
  readonly orderId: OrderIdVO;
  readonly event: TrackingStatusVO;
  readonly message: string;
  readonly location?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly trackingNumber?: string;
  readonly createdBy?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
  readonly occurredAt: string;
}

export class OrderTrackingEntity extends BaseEntity<string> {
  private readonly _orderId: OrderIdVO;
  private readonly _event: TrackingStatusVO;
  private readonly _message: string;
  private readonly _location?: string;
  private readonly _latitude?: number;
  private readonly _longitude?: number;
  private readonly _trackingNumber?: string;
  private readonly _createdBy?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;
  private readonly _occurredAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderTrackingEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._event = props.event;
    this._message = props.message;
    this._location = props.location;
    this._latitude = props.latitude;
    this._longitude = props.longitude;
    this._trackingNumber = props.trackingNumber;
    this._createdBy = props.createdBy;
    this._metadata = props.metadata;
    this._occurredAt = props.occurredAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._message || this._message.trim().length === 0) {
      throw new ValidationError('Message cannot be empty', 'message');
    }
    if (this._message.length > 500) {
      throw new ValidationError('Message cannot exceed 500 chars', 'message');
    }
    if (this._latitude !== undefined && (this._latitude < -90 || this._latitude > 90)) {
      throw new ValidationError('Latitude must be -90 to 90', 'latitude');
    }
    if (this._longitude !== undefined && (this._longitude < -180 || this._longitude > 180)) {
      throw new ValidationError('Longitude must be -180 to 180', 'longitude');
    }
  }

  get toIdVO(): TrackingIdVO { return TrackingIdVO.reconstitute(this.id); }
  get orderId(): OrderIdVO { return this._orderId; }
  get event(): TrackingStatusVO { return this._event; }
  get message(): string { return this._message; }
  get location(): string | undefined { return this._location; }
  get latitude(): number | undefined { return this._latitude; }
  get longitude(): number | undefined { return this._longitude; }
  get trackingNumber(): string | undefined { return this._trackingNumber; }
  get createdBy(): string | undefined { return this._createdBy; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }
  get occurredAt(): string { return this._occurredAt; }

  hasCoordinates(): boolean {
    return this._latitude !== undefined && this._longitude !== undefined;
  }

  isTerminal(): boolean {
    return this._event.isTerminal();
  }

  static create(params: {
    id: string;
    props: OrderTrackingEntityProps;
    now: string;
  }): OrderTrackingEntity {
    return new OrderTrackingEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: OrderTrackingEntityProps;
  }): OrderTrackingEntity {
    return new OrderTrackingEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
