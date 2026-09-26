/**
 * ComplaintVO — Complaint composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ComplaintIdVO } from '../primitives/complaint-id.vo';
import { ComplaintTypeVO } from '../primitives/complaint-type.vo';
import { ComplaintSeverityVO } from '../primitives/complaint-severity.vo';
import { ComplaintStatusVO } from '../primitives/complaint-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { OrderIdVO } from '../primitives/order-id.vo';
import { VendorIdVO } from '../primitives/vendor-id.vo';

export interface ComplaintVOProps {
  readonly id: ComplaintIdVO;
  readonly type: ComplaintTypeVO;
  readonly severity: ComplaintSeverityVO;
  readonly status: ComplaintStatusVO;
  readonly userId: UserIdVO;
  readonly orderId?: OrderIdVO;
  readonly vendorId?: VendorIdVO;
  readonly description: string;
}

export class ComplaintVO extends BaseVO<Readonly<ComplaintVOProps>> {
  private constructor(props: ComplaintVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ComplaintVOProps): ComplaintVO {
    if (!props.id || !props.type || !props.userId) {
      throw new ValidationError(
        'ComplaintVO requires id, type, userId',
        'complaint',
      );
    }
    if (typeof props.description !== 'string' || props.description.trim().length === 0) {
      throw new ValidationError(
        'ComplaintVO description required',
        'complaint',
      );
    }
    return new ComplaintVO(props);
  }

  get id(): ComplaintIdVO {
    return this.value.id;
  }

  get isCritical(): boolean {
    return this.value.severity.isCritical();
  }

  get isResolved(): boolean {
    return this.value.status.isResolved();
  }

  get isPending(): boolean {
    return this.value.status.isPending();
  }

  get involvesOrder(): boolean {
    return this.value.orderId !== undefined;
  }

  get involvesVendor(): boolean {
    return this.value.vendorId !== undefined;
  }

  get needsImmediateAttention(): boolean {
    return this.value.severity.isCritical() && !this.isResolved;
  }
}
