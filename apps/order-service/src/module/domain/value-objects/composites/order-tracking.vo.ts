/**
 * OrderTrackingVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 *
 * Immutable tracking event entry.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { TrackingIdVO } from '../primitives/tracking-id.vo.js';
import { TrackingStatusVO } from '../primitives/tracking-status.vo.js';
import { TrackingNumberVO } from '../primitives/tracking-number.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';

export interface OrderTrackingVOProps {
  readonly id: TrackingIdVO;
  readonly orderId: OrderIdVO;
  readonly status: TrackingStatusVO;
  readonly trackingNumber: TrackingNumberVO;
  readonly message: string;
  readonly location?: string;
  readonly carrier?: string;
  readonly occurredAt: string;
}

export class OrderTrackingVO extends BaseVO<OrderTrackingVOProps> {
  private constructor(props: OrderTrackingVOProps) {
    super(props);
    Object.freeze(this);
  }

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
    if (typeof v.message !== 'string' || v.message.trim().length === 0) {
      throw new ValidationError('Tracking message cannot be empty', 'message');
    }
  }

  // ═══ Getters ═══
  get id(): TrackingIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get status(): TrackingStatusVO { return this.value.status; }
  get trackingNumber(): TrackingNumberVO { return this.value.trackingNumber; }
  get message(): string { return this.value.message; }
  get location(): string | undefined { return this.value.location; }
  get carrier(): string | undefined { return this.value.carrier; }
  get occurredAt(): string { return this.value.occurredAt; }

  // ═══ Business methods ═══
  isTerminal(): boolean { return this.status.isTerminal(); }
  hasLocation(): boolean { return this.location !== undefined && this.location.length > 0; }
  hasCarrier(): boolean { return this.carrier !== undefined; }
}
