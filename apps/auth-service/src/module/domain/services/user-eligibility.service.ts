import { UserEntity } from '../entities/user.entity';

export class UserEligibilityService {
  canLogin(user: UserEntity): boolean {
    return !user.isDeleted() && user.status.value === 'active';
  }

  canRegister(user: UserEntity | null): boolean {
    return user === null;
  }

  canResetPassword(user: UserEntity): boolean {
    return !user.isDeleted() && user.status.value !== 'suspended';
  }

  canEnableMfa(user: UserEntity): boolean {
    return !user.isDeleted() && user.status.value === 'active';
  }
}
