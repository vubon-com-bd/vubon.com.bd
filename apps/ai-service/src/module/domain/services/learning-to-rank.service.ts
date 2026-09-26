export interface RankingFeatures {
  readonly documentId: string;
  readonly relevanceScore: number;
  readonly clickThroughRate: number;
  readonly freshness: number;
  readonly popularity: number;
}

export class LearningToRankService {
  private static readonly WEIGHTS = Object.freeze({
    relevance: 0.4,
    ctr: 0.3,
    freshness: 0.2,
    popularity: 0.1,
  });

  score(features: RankingFeatures): number {
    return (
      features.relevanceScore * LearningToRankService.WEIGHTS.relevance +
      features.clickThroughRate * LearningToRankService.WEIGHTS.ctr +
      features.freshness * LearningToRankService.WEIGHTS.freshness +
      features.popularity * LearningToRankService.WEIGHTS.popularity
    );
  }

  rank(items: readonly RankingFeatures[]): readonly RankingFeatures[] {
    return [...items].sort((a, b) => this.score(b) - this.score(a));
  }

  scoreBatch(
    items: readonly RankingFeatures[],
  ): readonly { readonly documentId: string; readonly score: number }[] {
    return items
      .map((i) => ({ documentId: i.documentId, score: this.score(i) }))
      .sort((a, b) => b.score - a.score);
  }
}
