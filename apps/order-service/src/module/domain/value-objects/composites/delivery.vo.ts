/**
 * DeliveryVO — Composite Value Object
 * @module order-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeliveryIdVO } from '../primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '../primitives/delivery-method-id.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { TrackingNumberVO } from '../primitives/tracking-number.vo.js';

export interface DeliveryVOProps {
  readonly id: DeliveryIdVO;
  readonly orderId: OrderIdVO;
  readonly methodId: DeliveryMethodIdVO;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly trackingNumber?: TrackingNumberVO;
  readonly courierId?: string;
  readonly estimatedAt?: string;
  readonly deliveredAt?: string;
  readonly attempts: number;
}

export class DeliveryVO extends BaseVO<DeliveryVOProps> {
  private constructor(props: DeliveryVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DeliveryVOProps): DeliveryVO {
    const vo = new DeliveryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: DeliveryVOProps): DeliveryVO {
    return new DeliveryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isInteger(v.attempts) || v.attempts < 0) {
      throw new ValidationError('Delivery attempts must be non-negative integer', 'attempts');
    }
    if (v.status.isDelivered() && !v.deliveredAt) {
      throw new ValidationError('Delivered status requires deliveredAt', 'deliveredAt');
    }
  }

  // ═══ Getters ═══
  get id(): DeliveryIdVO { return this.value.id; }
  get orderId(): OrderIdVO { return this.value.orderId; }
  get methodId(): DeliveryMethodIdVO { return this.value.methodId; }
  get status(): DeliveryStatusVO { return this.value.status; }
  get type(): DeliveryTypeVO { return this.value.type; }
  get trackingNumber(): TrackingNumberVO | undefined { return this.value.trackingNumber; }
  get courierId(): string | undefined { return this.value.courierId; }
  get estimatedAt(): string | undefined { return this.value.estimatedAt; }
  get deliveredAt(): string | undefined { return this.value.deliveredAt; }
  get attempts(): number { return this.value.attempts; }

  // ═══ Business methods ═══
  hasTracking(): boolean { return this.trackingNumber !== undefined; }
  isDelivered(): boolean { return this.status.isDelivered(); }
  canRetry(): boolean { return this.status.isFailed() && this.attempts < 3; }
}
