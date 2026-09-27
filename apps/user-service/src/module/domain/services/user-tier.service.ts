/**
 * UserTierService — Domain Service
 * @module user-service/domain/services
 *
 * Calculates user tier based on activity/verification signals.
 */
import { UserEntity } from '../entities/user.entity.js';

export type UserTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface TierSignals {
  readonly hasVerifiedEmail: boolean;
  readonly hasVerifiedPhone: boolean;
  readonly hasKyc: boolean;
  readonly accountAgeDays: number;
}

export class UserTierService {
  static computeTier(user: UserEntity, signals: TierSignals): UserTier {
    let score = 0;
    if (signals.hasVerifiedEmail) score += 1;
    if (signals.hasVerifiedPhone) score += 1;
    if (signals.hasKyc) score += 2;
    if (signals.accountAgeDays >= 30) score += 1;
    if (signals.accountAgeDays >= 365) score += 1;

    if (user.isAdmin()) return 'platinum';

    if (score >= 5) return 'platinum';
    if (score >= 4) return 'gold';
    if (score >= 2) return 'silver';
    return 'bronze';
  }

  static requiresEnhancedKyc(tier: UserTier): boolean {
    return tier === 'gold' || tier === 'platinum';
  }

  static maxAddressesFor(tier: UserTier): number {
    switch (tier) {
      case 'bronze': return 3;
      case 'silver': return 5;
      case 'gold': return 10;
      case 'platinum': return 20;
    }
  }
}
