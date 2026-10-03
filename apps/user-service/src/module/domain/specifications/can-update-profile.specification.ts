/**
 * CanUpdateProfileSpecification
 * @module user-service/domain/specifications
 *
 * Business rule: A user can update their profile only if:
 *  - not deleted
 *  - not suspended/blocked
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity.js';

export class CanUpdateProfileSpecification extends Specification<UserEntity> {
  isSatisfiedBy(user: UserEntity): boolean {
    if (user.isDeleted()) return false;
    if (user.status.isSuspended()) return false;
    if (user.status.isBlocked()) return false;
    return true;
  }

  static check(user: UserEntity): boolean {
    return new CanUpdateProfileSpecification().isSatisfiedBy(user);
  }
}
