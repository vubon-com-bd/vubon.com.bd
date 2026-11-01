/**
 * Delivery Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeliveryIdVO } from '../primitives/delivery-id.vo.js';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../primitives/delivery-type.vo.js';
import { DeliveryWindowVO } from '../primitives/delivery-window.vo.js';

export interface DeliveryVOProps {
  readonly id: DeliveryIdVO;
  readonly shipmentId: string;
  readonly orderId: string;
  readonly userId?: string;
  readonly status: DeliveryStatusVO;
  readonly type: DeliveryTypeVO;
  readonly window?: DeliveryWindowVO;
  readonly driverId?: string;
  readonly vehicleId?: string;
  readonly routeId?: string;
  readonly recipientName?: string;
  readonly recipientPhone?: string;
  readonly deliveryAddress: string;
  readonly scheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly arrivedAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly cancelledAt?: string;
  readonly attemptCount: number;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
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
    if (!v.shipmentId || v.shipmentId.trim().length === 0) {
      throw new ValidationError('Shipment ID required', 'shipmentId');
    }
    if (!v.orderId || v.orderId.trim().length === 0) {
      throw new ValidationError('Order ID required', 'orderId');
    }
    if (!v.deliveryAddress || v.deliveryAddress.trim().length === 0) {
      throw new ValidationError('Delivery address required', 'deliveryAddress');
    }
    if (v.attemptCount < 0) {
      throw new ValidationError('Attempt count cannot be negative', 'attemptCount');
    }
  }

  get id(): DeliveryIdVO { return this.value.id; }
  get shipmentId(): string { return this.value.shipmentId; }
  get orderId(): string { return this.value.orderId; }
  get userId(): string | undefined { return this.value.userId; }
  get status(): DeliveryStatusVO { return this.value.status; }
  get type(): DeliveryTypeVO { return this.value.type; }
  get window(): DeliveryWindowVO | undefined { return this.value.window; }
  get driverId(): string | undefined { return this.value.driverId; }
  get vehicleId(): string | undefined { return this.value.vehicleId; }
  get routeId(): string | undefined { return this.value.routeId; }
  get recipientName(): string | undefined { return this.value.recipientName; }
  get recipientPhone(): string | undefined { return this.value.recipientPhone; }
  get deliveryAddress(): string { return this.value.deliveryAddress; }
  get scheduledAt(): string | undefined { return this.value.scheduledAt; }
  get pickedUpAt(): string | undefined { return this.value.pickedUpAt; }
  get arrivedAt(): string | undefined { return this.value.arrivedAt; }
  get deliveredAt(): string | undefined { return this.value.deliveredAt; }
  get failedAt(): string | undefined { return this.value.failedAt; }
  get cancelledAt(): string | undefined { return this.value.cancelledAt; }
  get attemptCount(): number { return this.value.attemptCount; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isScheduled(): boolean { return this.status.isScheduled(); }
  isDelivered(): boolean { return this.status.isDelivered(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isInMotion(): boolean { return this.status.isInMotion(); }
  hasDriver(): boolean { return !!this.driverId; }
  hasWindow(): boolean { return !!this.window; }
  requiresSignature(): boolean { return this.type.requiresSignature(); }
}
