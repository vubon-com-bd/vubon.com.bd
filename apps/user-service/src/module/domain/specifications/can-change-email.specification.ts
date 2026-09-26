import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity';

export class CanChangeEmailSpecification extends Specification<UserEntity> {
  isSatisfiedBy(candidate: UserEntity): boolean {
    if (candidate.isDeleted()) return false;
    return candidate.status.isActive();
  }
}
