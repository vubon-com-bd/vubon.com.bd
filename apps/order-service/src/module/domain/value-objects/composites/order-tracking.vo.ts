/**
 * OrderTrackingVO
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TrackingIdVO } from '../primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '../primitives/tracking-status.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface OrderTrackingVOProps {
  readonly id: TrackingIdVO;
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

export class OrderTrackingVO extends BaseVO<OrderTrackingVOProps> {
  private constructor(props: OrderTrackingVOProps) { super(props); }

  static create(props: OrderTrackingVOProps): OrderTrackingVO {
    const vo = new OrderTrackingVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: OrderTrackingVOProps): OrderTrackingVO {
    return new OrderTrackingVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.message || v.message.trim().length === 0) {
      throw new ValidationError('Tracking message cannot be empty', 'message');
    }
    if (v.message.length > 500) {
      throw new ValidationError('Tracking message cannot exceed 500 chars', 'message');
    }
    if (!v.occurredAt || !Date.parse(v.occurredAt)) {
      throw new ValidationError('Invalid occurredAt date', 'occurredAt');
    }
    if (v.latitude !== undefined && (v.latitude < -90 || v.latitude > 90)) {
      throw new ValidationError('Latitude must be between -90 and 90', 'latitude');
    }
    if (v.longitude !== undefined && (v.longitude < -180 || v.longitude > 180)) {
      throw new ValidationError('Longitude must be between -180 and 180', 'longitude');
    }
  }

  get id(): TrackingIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get event(): TrackingStatusVO { return this.value.event; }
  get message(): string { return this.value.message; }
  get location(): string | undefined { return this.value.location; }
  get latitude(): number | undefined { return this.value.latitude; }
  get longitude(): number | undefined { return this.value.longitude; }
  get trackingNumber(): string | undefined { return this.value.trackingNumber; }
  get createdBy(): string | undefined { return this.value.createdBy; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this.value.metadata; }
  get occurredAt(): string { return this.value.occurredAt; }

  hasCoordinates(): boolean {
    return this.latitude !== undefined && this.longitude !== undefined;
  }

  isTerminal(): boolean {
    return this.event.isTerminal();
  }
}
