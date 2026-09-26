import { UserEntity } from '../entities/user.entity';

export type UserTier = 'basic' | 'standard' | 'premium' | 'vip';

export class UserTierService {
  static calculate(user: UserEntity): UserTier {
    if (user.emailVerified && user.phone !== null) return 'standard';
    return 'basic';
  }
}
