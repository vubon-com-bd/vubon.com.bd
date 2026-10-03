/**
 * CanChangePhoneSpecification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity.js';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo.js';

export class CanChangePhoneSpecification extends Specification<UserEntity> {
  constructor(private readonly newPhone: UserPhoneVO | null) {
    super();
  }

  isSatisfiedBy(user: UserEntity): boolean {
    if (user.isDeleted()) return false;
    if (user.status.isSuspended()) return false;
    if (this.newPhone === null && user.phone === null) return false;
    if (this.newPhone !== null && user.phone !== null) {
      if (user.phone.equals(this.newPhone)) return false;
    }
    return true;
  }

  static check(user: UserEntity, newPhone: UserPhoneVO | null): boolean {
    return new CanChangePhoneSpecification(newPhone).isSatisfiedBy(user);
  }
}
