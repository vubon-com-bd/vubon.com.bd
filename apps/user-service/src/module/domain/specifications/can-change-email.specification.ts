/**
 * CanChangeEmailSpecification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity.js';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo.js';

export class CanChangeEmailSpecification extends Specification<UserEntity> {
  constructor(private readonly newEmail: UserEmailVO) {
    super();
  }

  isSatisfiedBy(user: UserEntity): boolean {
    if (user.isDeleted()) return false;
    if (user.status.isSuspended()) return false;
    if (user.email.equals(this.newEmail)) return false;
    return true;
  }

  static check(user: UserEntity, newEmail: UserEmailVO): boolean {
    return new CanChangeEmailSpecification(newEmail).isSatisfiedBy(user);
  }
}
