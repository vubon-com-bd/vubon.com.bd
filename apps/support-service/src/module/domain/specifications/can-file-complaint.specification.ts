import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ComplaintEntity } from '../entities/complaint.entity';

export class CanFileComplaintSpecification extends Specification<ComplaintEntity> {
  isSatisfiedBy(candidate: ComplaintEntity): boolean {
    if (candidate.isDeleted()) return false;
    return candidate.userId.value.length > 0;
  }
}
