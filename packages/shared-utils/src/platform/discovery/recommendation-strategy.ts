export interface RecommendationStrategyData {
  type: string;
  category: string;
  weight: number;
  isCollaborativeFiltering: boolean;
  isContentBased: boolean;
  isHybrid: boolean;
  isPopularity: boolean;
  isTrending: boolean;
  isPersonalized: boolean;
  isRuleBased: boolean;
  isAiBased: boolean;
  isAssociation: boolean;
  isSequential: boolean;
  isContextual: boolean;
}

export class RecommendationStrategyBuilder {
  private strategy = 'collaborative_filtering';
  private weight = 1;

  setStrategy(strategy: string): this {
    this.strategy = strategy;
    return this;
  }

  setWeight(weight: number): this {
    this.weight = weight;
    return this;
  }

  build(): RecommendationStrategyData {
    return {
      type: this.strategy,
      category: 'recommendation_strategy',
      weight: this.weight,
      isCollaborativeFiltering: this.strategy === 'collaborative_filtering',
      isContentBased: this.strategy === 'content_based',
      isHybrid: this.strategy === 'hybrid',
      isPopularity: this.strategy === 'popularity',
      isTrending: this.strategy === 'trending',
      isPersonalized: this.strategy === 'personalized',
      isRuleBased: this.strategy === 'rule_based',
      isAiBased: this.strategy === 'ai_based',
      isAssociation: this.strategy === 'association',
      isSequential: this.strategy === 'sequential',
      isContextual: this.strategy === 'contextual',
    };
  }
}
