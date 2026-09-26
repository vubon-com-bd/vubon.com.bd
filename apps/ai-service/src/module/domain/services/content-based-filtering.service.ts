import { RecommendationScoreVO } from '../value-objects/primitives/recommendation-score.vo';

export interface ItemFeatures {
  readonly itemId: string;
  readonly tags: readonly string[];
  readonly categories: readonly string[];
}

export interface ScoredItem {
  readonly itemId: string;
  readonly score: RecommendationScoreVO;
}

export class ContentBasedFilteringService {
  /**
   * Cosine-like similarity between user profile and item.
   */
  private similarity(
    userTags: ReadonlySet<string>,
    userCategories: ReadonlySet<string>,
    item: ItemFeatures,
  ): number {
    const tagHits = item.tags.filter((t) => userTags.has(t)).length;
    const categoryHits = item.categories.filter((c) => userCategories.has(c)).length;
    const total = item.tags.length + item.categories.length;
    return total === 0 ? 0 : (tagHits + categoryHits) / total;
  }

  recommend(
    userTags: readonly string[],
    userCategories: readonly string[],
    items: readonly ItemFeatures[],
    topN: number,
  ): readonly ScoredItem[] {
    const tagSet = new Set(userTags);
    const catSet = new Set(userCategories);

    return items
      .map((item) => ({
        itemId: item.itemId,
        score: RecommendationScoreVO.create(
          this.similarity(tagSet, catSet, item),
        ),
      }))
      .filter((s) => s.score.value > 0)
      .sort((a, b) => b.score.value - a.score.value)
      .slice(0, topN);
  }
}
