import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { CohortEntity } from '../entities/cohort.entity';

export class CanViewCohortSpecification extends Specification<CohortEntity> {
  constructor(private readonly minSize = 10) {
    super();
  }

  isSatisfiedBy(candidate: CohortEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.size < this.minSize) return false;
    return true;
  }
}
