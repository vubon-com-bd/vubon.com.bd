export interface RecommendationData {
  recommendationId: string;
  productId: string;
  product: { id: string; name: string };
  type: string;
  strategy: string;
  source: string;
  score: number;
  rank: number;
  status: string;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class RecommendationBuilder {
  private productId = '';
  private product: { id: string; name: string } | null = null;
  private type = 'personalized';
  private strategy = 'collaborative_filtering';
  private score = 0;
  private rank = 0;
  private source = 'user';

  setProduct(productId: string, product: { id: string; name: string }): this {
    this.productId = productId;
    this.product = product;
    return this;
  }

  setType(type: string): this {
    this.type = type;
    return this;
  }

  setStrategy(strategy: string): this {
    this.strategy = strategy;
    return this;
  }

  setScore(score: number): this {
    this.score = score;
    return this;
  }

  setRank(rank: number): this {
    this.rank = rank;
    return this;
  }

  setSource(source: string): this {
    this.source = source;
    return this;
  }

  build(): RecommendationData {
    return {
      recommendationId: crypto.randomUUID(),
      productId: this.productId,
      product: this.product!,
      type: this.type,
      strategy: this.strategy,
      source: this.source,
      score: this.score,
      rank: this.rank,
      status: 'active',
      isActive: true,
      metadata: {},
    };
  }
}
