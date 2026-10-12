/**
 * CanSuspendVendorSpecification
 * @module vendor-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';

export class CanSuspendVendorSpecification extends Specification<VendorEntity> {
  isSatisfiedBy(vendor: VendorEntity): boolean {
    return vendor.status.canTransitionTo('suspended');
  }

  explain(vendor: VendorEntity): string | null {
    if (this.isSatisfiedBy(vendor)) return null;
    return `cannot suspend vendor from status "${vendor.status.value}"`;
  }
}
