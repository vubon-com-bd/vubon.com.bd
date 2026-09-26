export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LoyaltyAccount {
  readonly userId: string;
  readonly points: number;
  readonly tier: LoyaltyTier;
  readonly nextTierPoints: number;
  readonly lifetimePoints: number;
}

export interface RedeemLoyaltyRequest {
  readonly points: number;
  readonly rewardId: string;
}

export interface RedeemLoyaltyResponse {
  readonly success: boolean;
  readonly remainingPoints: number;
  readonly redemptionId: string;
}
