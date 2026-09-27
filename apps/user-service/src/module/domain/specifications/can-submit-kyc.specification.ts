/**
 * CanSubmitKycSpecification
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { UserEntity } from '../entities/user.entity.js';
import { UserKycEntity } from '../entities/user-kyc.entity.js';

export class CanSubmitKycSpecification extends Specification<UserEntity> {
  constructor(private readonly existingKyc: UserKycEntity | null = null) {
    super();
  }

  isSatisfiedBy(user: UserEntity): boolean {
    if (user.isDeleted()) return false;
    if (!user.isActive()) return false;
    if (!user.emailVerified) return false;
    if (!user.requiresKyc()) return false;

    if (this.existingKyc) {
      if (this.existingKyc.isVerified()) return false;
      if (this.existingKyc.status.isPending()) return false;
    }
    return true;
  }

  static check(user: UserEntity, existingKyc: UserKycEntity | null = null): boolean {
    return new CanSubmitKycSpecification(existingKyc).isSatisfiedBy(user);
  }
}
