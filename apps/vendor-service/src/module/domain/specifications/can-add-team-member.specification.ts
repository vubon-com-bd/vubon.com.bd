import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { VendorEntity } from '../entities/vendor.entity';

export class CanAddTeamMemberSpecification extends Specification<VendorEntity> {
  constructor(
    private readonly currentMembers: number,
    private readonly maxMembers: number,
  ) {
    super();
  }

  isSatisfiedBy(candidate: VendorEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value !== 'active') return false;
    return this.currentMembers < this.maxMembers;
  }
}
