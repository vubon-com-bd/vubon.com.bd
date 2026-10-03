/**
 * Determine tier from lifetime points
 * @module shared-utils/calculator/loyalty
 */
export interface TierDefinition {
  readonly name: string;
  readonly minPoints: number;
}

export function calculateTier(lifetimePoints: number, tiers: readonly TierDefinition[]): string {
  if (!Array.isArray(tiers) || tiers.length === 0) return '';
  const sorted = [...tiers].sort((a, b) => b.minPoints - a.minPoints);
  for (const tier of sorted) {
    if (lifetimePoints >= tier.minPoints) return tier.name;
  }
  return sorted[sorted.length - 1].name;
}
