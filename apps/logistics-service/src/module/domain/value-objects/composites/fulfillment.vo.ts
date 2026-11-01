/**
 * Fulfillment Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { FulfillmentIdVO } from '../primitives/fulfillment-id.vo.js';
import { FulfillmentStatusVO } from '../primitives/fulfillment-status.vo.js';
import { FulfillmentTypeVO } from '../primitives/fulfillment-type.vo.js';
import { FulfillmentPriorityVO } from '../primitives/fulfillment-priority.vo.js';

export interface FulfillmentVOProps {
  readonly id: FulfillmentIdVO;
  readonly orderId: string;
  readonly vendorId?: string;
  readonly warehouseId?: string;
  readonly status: FulfillmentStatusVO;
  readonly type: FulfillmentTypeVO;
  readonly priority: FulfillmentPriorityVO;
  readonly itemIds: readonly string[];
  readonly itemCount: number;
  readonly assignedTo?: string;
  readonly pickedAt?: string;
  readonly packedAt?: string;
  readonly shippedAt?: string;
  readonly fulfilledAt?: string;
  readonly cancelledAt?: string;
  readonly failedAt?: string;
  readonly slaDueAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class FulfillmentVO extends BaseVO<FulfillmentVOProps> {
  private constructor(props: FulfillmentVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: FulfillmentVOProps): FulfillmentVO {
    const vo = new FulfillmentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: FulfillmentVOProps): FulfillmentVO {
    return new FulfillmentVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.orderId) throw new ValidationError('Order ID required', 'orderId');
    if (v.itemIds.length === 0) {
      throw new ValidationError('Fulfillment must have at least one item', 'itemIds');
    }
    if (v.itemCount !== v.itemIds.length) {
      throw new ValidationError(
        `itemCount (${v.itemCount}) does not match itemIds length (${v.itemIds.length})`,
        'itemCount',
      );
    }
  }

  get id(): FulfillmentIdVO { return this.value.id; }
  get orderId(): string { return this.value.orderId; }
  get vendorId(): string | undefined { return this.value.vendorId; }
  get warehouseId(): string | undefined { return this.value.warehouseId; }
  get status(): FulfillmentStatusVO { return this.value.status; }
  get type(): FulfillmentTypeVO { return this.value.type; }
  get priority(): FulfillmentPriorityVO { return this.value.priority; }
  get itemIds(): readonly string[] { return this.value.itemIds; }
  get itemCount(): number { return this.value.itemCount; }
  get assignedTo(): string | undefined { return this.value.assignedTo; }
  get pickedAt(): string | undefined { return this.value.pickedAt; }
  get packedAt(): string | undefined { return this.value.packedAt; }
  get shippedAt(): string | undefined { return this.value.shippedAt; }
  get fulfilledAt(): string | undefined { return this.value.fulfilledAt; }
  get cancelledAt(): string | undefined { return this.value.cancelledAt; }
  get failedAt(): string | undefined { return this.value.failedAt; }
  get slaDueAt(): string | undefined { return this.value.slaDueAt; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isPending(): boolean { return this.status.isPending(); }
  isProcessing(): boolean { return this.status.isProcessing(); }
  isFulfilled(): boolean { return this.status.isFulfilled(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isActive(): boolean { return this.status.isActive(); }

  isSlaBreached(ref: Date = new Date()): boolean {
    if (!this.slaDueAt || this.isFinal()) return false;
    return new Date(this.slaDueAt) < ref;
  }
}
