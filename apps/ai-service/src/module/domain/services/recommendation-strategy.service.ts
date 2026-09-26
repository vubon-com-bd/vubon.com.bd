import { RecommendationStrategyVO } from '../value-objects/primitives/recommendation-strategy.vo';

export interface StrategyContext {
  readonly hasHistory: boolean;
  readonly hasSimilarUsers: boolean;
  readonly itemCount: number;
}

export class RecommendationStrategyService {
  /**
   * Decide which strategy to use based on user data.
   */
  selectStrategy(context: StrategyContext): RecommendationStrategyVO {
    if (context.hasHistory && context.hasSimilarUsers) {
      return RecommendationStrategyVO.create('hybrid');
    }
    if (context.hasSimilarUsers && context.itemCount > 10) {
      return RecommendationStrategyVO.create('collaborative_filtering');
    }
    if (context.hasHistory) {
      return RecommendationStrategyVO.create('content_based');
    }
    return RecommendationStrategyVO.create('popularity');
  }

  isStrategyEnabled(
    strategy: RecommendationStrategyVO,
    context: StrategyContext,
  ): boolean {
    switch (strategy.value) {
      case 'collaborative_filtering':
        return context.hasSimilarUsers;
      case 'content_based':
        return context.hasHistory;
      case 'hybrid':
        return context.hasHistory && context.hasSimilarUsers;
      case 'popularity':
        return true;
      default:
        return false;
    }
  }
}
