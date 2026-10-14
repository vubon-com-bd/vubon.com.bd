/**
 * Tier Response DTOs
 * @module vendor-service/application/dtos/responses
 */
export interface TierResponseDTO {
  readonly tier: string;
  readonly commissionPercent: number;
  readonly payoutDays: number;
  readonly minSales: number;
  readonly maxSales: number | null;
  readonly weight: number;
}

export interface TierListResponseDTO {
  readonly tiers: readonly TierResponseDTO[];
}

export interface TierEvaluationResponseDTO {
  readonly currentTier: string;
  readonly eligibleTier: string;
  readonly shouldUpgrade: boolean;
  readonly shouldDowngrade: boolean;
  readonly reason: string;
  readonly totalSales: number;
  readonly salesToNextTier: number | null;
  readonly progressPercent: number;
  readonly warnings: readonly string[];
}
