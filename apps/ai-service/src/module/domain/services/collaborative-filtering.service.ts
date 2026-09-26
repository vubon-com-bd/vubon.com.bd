import { RecommendationScoreVO } from '../value-objects/primitives/recommendation-score.vo';

export interface UserInteraction {
  readonly userId: string;
  readonly itemIds: readonly string[];
}

export interface ScoredItem {
  readonly itemId: string;
  readonly score: RecommendationScoreVO;
}

export class CollaborativeFilteringService {
  /**
   * Jaccard similarity between two users' interaction sets.
   */
  similarity(a: UserInteraction, b: UserInteraction): number {
    const setA = new Set(a.itemIds);
    const setB = new Set(b.itemIds);
    const intersection = [...setA].filter((id) => setB.has(id)).length;
    const union = new Set([...setA, ...setB]).size;
    return union === 0 ? 0 : intersection / union;
  }

  /**
   * Recommend items liked by similar users but not by target user.
   */
  recommend(
    target: UserInteraction,
    others: readonly UserInteraction[],
    topN: number,
  ): readonly ScoredItem[] {
    const targetSet = new Set(target.itemIds);
    const candidateScores = new Map<string, number>();

    for (const other of others) {
      const sim = this.similarity(target, other);
      if (sim === 0) continue;
      for (const itemId of other.itemIds) {
        if (targetSet.has(itemId)) continue;
        const current = candidateScores.get(itemId) ?? 0;
        candidateScores.set(itemId, current + sim);
      }
    }

    return [...candidateScores.entries()]
      .map(([itemId, rawScore]) => ({
        itemId,
        score: RecommendationScoreVO.create(Math.min(1, rawScore)),
      }))
      .sort((a, b) => b.score.value - a.score.value)
      .slice(0, topN);
  }
}
