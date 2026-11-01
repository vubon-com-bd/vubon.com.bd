/**
 * ReturnReason Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ReturnReasonIdVO } from '../primitives/return-reason-id.vo.js';
import { ReturnReasonTypeVO } from '../primitives/return-reason-type.vo.js';
import { ReturnReasonLabelVO } from '../primitives/return-reason-label.vo.js';

export interface ReturnReasonVOProps {
  readonly id: ReturnReasonIdVO;
  readonly code: string;
  readonly type: ReturnReasonTypeVO;
  readonly label: ReturnReasonLabelVO;
  readonly description?: string;
  readonly requiresPhoto: boolean;
  readonly autoApprove: boolean;
  readonly isActive: boolean;
  readonly priority: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class ReturnReasonCompositeVO extends BaseVO<ReturnReasonVOProps> {
  private constructor(props: ReturnReasonVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ReturnReasonVOProps): ReturnReasonCompositeVO {
    const vo = new ReturnReasonCompositeVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ReturnReasonVOProps): ReturnReasonCompositeVO {
    return new ReturnReasonCompositeVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.code || v.code.trim().length === 0) {
      throw new ValidationError('Code required', 'code');
    }
    if (!Number.isInteger(v.priority) || v.priority < 0) {
      throw new ValidationError('Priority must be non-negative integer', 'priority');
    }
  }

  get id(): ReturnReasonIdVO { return this.value.id; }
  get code(): string { return this.value.code; }
  get type(): ReturnReasonTypeVO { return this.value.type; }
  get label(): ReturnReasonLabelVO { return this.value.label; }
  get description(): string | undefined { return this.value.description; }
  get requiresPhoto(): boolean { return this.value.requiresPhoto; }
  get autoApprove(): boolean { return this.value.autoApprove; }
  get isActive(): boolean { return this.value.isActive; }
  get priority(): number { return this.value.priority; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isSellerFault(): boolean { return this.type.isSellerFault(); }
  isCustomerFault(): boolean { return this.type.isCustomerFault(); }
  isCarrierFault(): boolean { return this.type.isCarrierFault(); }

  needsPhoto(): boolean {
    return this.requiresPhoto || this.type.requiresPhoto();
  }

  isUsable(): boolean {
    return this.isActive;
  }
}
