export interface PersonalizationProfile {
  readonly userId: string;
  readonly segments: readonly string[];
  readonly interests: readonly string[];
  readonly signals: Record<string, number>;
  readonly updatedAt: string;
}
