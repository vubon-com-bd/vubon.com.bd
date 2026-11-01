/**
 * ReturnShipment Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ReturnShipmentIdVO } from '../primitives/return-shipment-id.vo.js';
import { ReturnShipmentStatusVO } from '../primitives/return-shipment-status.vo.js';
import { ReturnReasonVO } from '../primitives/return-reason.vo.js';
import { ReturnShipmentTypeVO } from '../primitives/return-shipment-type.vo.js';

export interface ReturnShipmentVOProps {
  readonly id: ReturnShipmentIdVO;
  readonly rmaNumber: string;
  readonly orderId: string;
  readonly originalShipmentId?: string;
  readonly userId: string;
  readonly status: ReturnShipmentStatusVO;
  readonly type: ReturnShipmentTypeVO;
  readonly reason: ReturnReasonVO;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly itemIds: readonly string[];
  readonly itemCount: number;
  readonly pickupAddress: string;
  readonly pickupScheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly inspectedAt?: string;
  readonly inspectedBy?: string;
  readonly restockable: boolean;
  readonly refundAmount?: number;
  readonly refundCurrency?: string;
  readonly restockFeeAmount?: number;
  readonly trackingNumber?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class ReturnShipmentVO extends BaseVO<ReturnShipmentVOProps> {
  private constructor(props: ReturnShipmentVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ReturnShipmentVOProps): ReturnShipmentVO {
    const vo = new ReturnShipmentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ReturnShipmentVOProps): ReturnShipmentVO {
    return new ReturnShipmentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.rmaNumber) throw new ValidationError('RMA number required', 'rmaNumber');
    if (!v.orderId) throw new ValidationError('Order ID required', 'orderId');
    if (!v.userId) throw new ValidationError('User ID required', 'userId');
    if (!v.pickupAddress) {
      throw new ValidationError('Pickup address required', 'pickupAddress');
    }
    if (v.itemIds.length === 0) {
      throw new ValidationError('At least one item required', 'itemIds');
    }
    if (v.itemCount !== v.itemIds.length) {
      throw new ValidationError(
        'itemCount must match itemIds length',
        'itemCount',
      );
    }
    if (v.refundAmount !== undefined && v.refundAmount < 0) {
      throw new ValidationError('Refund amount cannot be negative', 'refundAmount');
    }
    if (v.restockFeeAmount !== undefined && v.restockFeeAmount < 0) {
      throw new ValidationError(
        'Restock fee cannot be negative',
        'restockFeeAmount',
      );
    }
    if (v.reason.requiresPhoto() && (!v.images || v.images.length === 0)) {
      throw new ValidationError(
        `Reason "${v.reason.value}" requires at least one photo`,
        'images',
      );
    }
  }

  get id(): ReturnShipmentIdVO { return this.value.id; }
  get rmaNumber(): string { return this.value.rmaNumber; }
  get orderId(): string { return this.value.orderId; }
  get originalShipmentId(): string | undefined { return this.value.originalShipmentId; }
  get userId(): string { return this.value.userId; }
  get status(): ReturnShipmentStatusVO { return this.value.status; }
  get type(): ReturnShipmentTypeVO { return this.value.type; }
  get reason(): ReturnReasonVO { return this.value.reason; }
  get description(): string | undefined { return this.value.description; }
  get images(): readonly string[] | undefined { return this.value.images; }
  get itemIds(): readonly string[] { return this.value.itemIds; }
  get itemCount(): number { return this.value.itemCount; }
  get pickupAddress(): string { return this.value.pickupAddress; }
  get pickupScheduledAt(): string | undefined { return this.value.pickupScheduledAt; }
  get pickedUpAt(): string | undefined { return this.value.pickedUpAt; }
  get receivedAt(): string | undefined { return this.value.receivedAt; }
  get inspectedAt(): string | undefined { return this.value.inspectedAt; }
  get inspectedBy(): string | undefined { return this.value.inspectedBy; }
  get restockable(): boolean { return this.value.restockable; }
  get refundAmount(): number | undefined { return this.value.refundAmount; }
  get refundCurrency(): string | undefined { return this.value.refundCurrency; }
  get restockFeeAmount(): number | undefined { return this.value.restockFeeAmount; }
  get trackingNumber(): string | undefined { return this.value.trackingNumber; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isRequested(): boolean { return this.status.isRequested(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isCompleted(): boolean { return this.status.isCompleted(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isInProgress(): boolean { return this.status.isInProgress(); }

  hasRefund(): boolean {
    return (this.refundAmount ?? 0) > 0;
  }

  isRestockable(): boolean {
    return this.restockable && !this.status.isFinal();
  }
}
