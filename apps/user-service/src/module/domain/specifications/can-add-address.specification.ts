import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity';

const MAX_ADDRESSES = 10;

export class CanAddAddressSpecification extends Specification<UserEntity> {
  constructor(private readonly currentCount: number) {
    super();
  }

  isSatisfiedBy(candidate: UserEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (!candidate.status.isActive()) return false;
    return this.currentCount < MAX_ADDRESSES;
  }
}
