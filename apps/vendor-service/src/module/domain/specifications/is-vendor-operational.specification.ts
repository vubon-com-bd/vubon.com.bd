/**
 * IsVendorOperationalSpecification
 * @module vendor-service/domain/specifications
 *
 * Passes when a vendor is in a state that allows transactions.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity.js';

export class IsVendorOperationalSpecification extends Specification<VendorEntity> {
  isSatisfiedBy(vendor: VendorEntity): boolean {
    return vendor.isOperational();
  }

  explain(vendor: VendorEntity): string | null {
    if (vendor.isOperational()) return null;
    return `vendor status "${vendor.status.value}" is not operational`;
  }
}
