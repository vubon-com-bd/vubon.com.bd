/**
 * CanAddAddressSpecification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { USER_ADDRESS } from '@vubon/shared-constants/user';
import { UserEntity } from '../entities/user.entity.js';

export class CanAddAddressSpecification extends Specification<UserEntity> {
  constructor(
    private readonly currentAddressCount: number,
    private readonly maxAllowed: number = USER_ADDRESS.MAX_ADDRESSES
  ) {
    super();
  }

  isSatisfiedBy(user: UserEntity): boolean {
    if (user.isDeleted()) return false;
    if (!user.isActive()) return false;
    if (this.currentAddressCount >= this.maxAllowed) return false;
    return true;
  }

  static check(
    user: UserEntity,
    currentAddressCount: number,
    maxAllowed: number = USER_ADDRESS.MAX_ADDRESSES
  ): boolean {
    return new CanAddAddressSpecification(currentAddressCount, maxAllowed).isSatisfiedBy(user);
  }
}
