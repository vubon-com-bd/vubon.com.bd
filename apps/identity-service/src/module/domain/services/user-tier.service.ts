/**
 * UserTierService — computes user tier based on activity
 * @module identity-service/domain/services
 */
export type UserTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

export interface UserTierInput {
  readonly totalOrders: number;
  readonly totalSpent: number;
  readonly accountAgeDays: number;
  readonly kycLevel: number;
}

export interface UserTierResult {
  readonly tier: UserTier;
  readonly score: number;
  readonly nextTierAt: number;
}

export class UserTierService {
  private static readonly TIER_THRESHOLDS = {
    bronze: 0,
    silver: 100,
    gold: 500,
    platinum: 2000,
    diamond: 5000,
  } as const;

  static compute(input: UserTierInput): UserTierResult {
    const orderScore = Math.min(input.totalOrders * 5, 500);
    const spendScore = Math.min(input.totalSpent / 100, 1000);
    const ageScore = Math.min(input.accountAgeDays / 30, 200);
    const kycBonus = input.kycLevel * 100;

    const score = Math.round(orderScore + spendScore + ageScore + kycBonus);

    const tier = UserTierService.tierFromScore(score);
    const nextTierAt = UserTierService.nextThreshold(score);

    return { tier, score, nextTierAt };
  }

  static tierFromScore(score: number): UserTier {
    const t = UserTierService.TIER_THRESHOLDS;
    if (score >= t.diamond) return 'diamond';
    if (score >= t.platinum) return 'platinum';
    if (score >= t.gold) return 'gold';
    if (score >= t.silver) return 'silver';
    return 'bronze';
  }

  static nextThreshold(score: number): number {
    const t = UserTierService.TIER_THRESHOLDS;
    const thresholds = [t.silver, t.gold, t.platinum, t.diamond];
    for (const th of thresholds) {
      if (score < th) return th;
    }
    return t.diamond;
  }
}
