import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity';

export class CanResetPasswordSpecification extends Specification<UserEntity> {
  isSatisfiedBy(candidate: UserEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.value === 'suspended') return false;
    return true;
  }
}
