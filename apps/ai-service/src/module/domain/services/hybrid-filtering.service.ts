import { RecommendationScoreVO } from '../value-objects/primitives/recommendation-score.vo';

export interface ScoredItem {
  readonly itemId: string;
  readonly score: RecommendationScoreVO;
}

export class HybridFilteringService {
  /**
   * Weighted merge of collaborative + content-based scores.
   */
  merge(
    collaborative: readonly ScoredItem[],
    contentBased: readonly ScoredItem[],
    collaborativeWeight = 0.5,
  ): readonly ScoredItem[] {
    if (collaborativeWeight < 0 || collaborativeWeight > 1) {
      throw new Error('HybridFiltering: weight must be in [0,1]');
    }

    const contentWeight = 1 - collaborativeWeight;
    const merged = new Map<string, number>();

    for (const item of collaborative) {
      merged.set(item.itemId, item.score.value * collaborativeWeight);
    }
    for (const item of contentBased) {
      const current = merged.get(item.itemId) ?? 0;
      merged.set(item.itemId, current + item.score.value * contentWeight);
    }

    return [...merged.entries()]
      .map(([itemId, raw]) => ({
        itemId,
        score: RecommendationScoreVO.create(Math.min(1, raw)),
      }))
      .sort((a, b) => b.score.value - a.score.value);
  }

  pickTopN(items: readonly ScoredItem[], n: number): readonly ScoredItem[] {
    return items.slice(0, n);
  }
}
