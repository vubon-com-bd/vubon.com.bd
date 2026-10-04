/**
 * TrackingStatus Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_TRACKING_EVENT } from '@vubon/shared-constants/business/order';
import { InvalidTrackingStatusError } from '../../errors/order-tracking.errors.js';

const ALLOWED = Object.values(ORDER_TRACKING_EVENT) as readonly string[];

export class TrackingStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): TrackingStatusVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidTrackingStatusError(raw, ALLOWED);
    }
    return new TrackingStatusVO(raw);
  }

  static reconstitute(raw: string): TrackingStatusVO {
    return new TrackingStatusVO(raw);
  }

  isOrderPlaced(): boolean { return this.value === ORDER_TRACKING_EVENT.ORDER_PLACED; }
  isDelivered(): boolean { return this.value === ORDER_TRACKING_EVENT.DELIVERED; }
  isCancelled(): boolean { return this.value === ORDER_TRACKING_EVENT.CANCELLED; }
  isReturned(): boolean { return this.value === ORDER_TRACKING_EVENT.RETURNED; }

  isTerminal(): boolean {
    return [
      ORDER_TRACKING_EVENT.DELIVERED,
      ORDER_TRACKING_EVENT.CANCELLED,
      ORDER_TRACKING_EVENT.RETURNED,
    ].includes(this.value as never);
  }
}
