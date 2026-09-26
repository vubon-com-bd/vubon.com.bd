import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity';

export class CanBeApprovedSpecification extends Specification<VendorEntity> {
  isSatisfiedBy(candidate: VendorEntity): boolean {
    if (candidate.isDeleted()) return false;
    return candidate.status.value === 'pending_approval';
  }
}
