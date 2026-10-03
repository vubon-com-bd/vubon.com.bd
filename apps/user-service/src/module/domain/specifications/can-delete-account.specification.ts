/**
 * CanDeleteAccountSpecification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity.js';

export class CanDeleteAccountSpecification extends Specification<UserEntity> {
  constructor(private readonly hasActiveOrders: boolean = false) {
    super();
  }

  isSatisfiedBy(user: UserEntity): boolean {
    if (user.isDeleted()) return false;
    if (user.isAdmin()) return false;
    if (this.hasActiveOrders) return false;
    return true;
  }

  static check(user: UserEntity, hasActiveOrders: boolean = false): boolean {
    return new CanDeleteAccountSpecification(hasActiveOrders).isSatisfiedBy(user);
  }
}
