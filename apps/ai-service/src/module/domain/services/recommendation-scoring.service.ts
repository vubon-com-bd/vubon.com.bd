import { RecommendationScoreVO } from '../value-objects/primitives/recommendation-score.vo';

export interface ScoringInput {
  readonly baseScore: number;
  readonly freshnessBoost: number;
  readonly affinityBoost: number;
  readonly popularityBoost: number;
}

export class RecommendationScoringService {
  private static readonly WEIGHTS = Object.freeze({
    base: 1.0,
    freshness: 0.3,
    affinity: 0.4,
    popularity: 0.2,
  });

  score(input: ScoringInput): RecommendationScoreVO {
    const weighted =
      input.baseScore * RecommendationScoringService.WEIGHTS.base +
      input.freshnessBoost * RecommendationScoringService.WEIGHTS.freshness +
      input.affinityBoost * RecommendationScoringService.WEIGHTS.affinity +
      input.popularityBoost * RecommendationScoringService.WEIGHTS.popularity;

    const normalized = Math.max(0, Math.min(1, weighted / 1.9));
    return RecommendationScoreVO.create(normalized);
  }

  rankByScore<T extends { score: RecommendationScoreVO }>(
    items: readonly T[],
  ): readonly T[] {
    return [...items].sort((a, b) => b.score.value - a.score.value);
  }
}
