import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity';

export class CanBeSuspendedSpecification extends Specification<VendorEntity> {
  isSatisfiedBy(candidate: VendorEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value === 'suspended') return false;
    return true;
  }
}
