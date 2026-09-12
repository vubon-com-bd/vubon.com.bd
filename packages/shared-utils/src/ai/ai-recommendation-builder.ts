export interface AIRecommendationData {
  recommendationId: string;
  aiId: string;
  productId: string;
  product: { id: string; name: string };
  type: string;
  strategy: string;
  algorithm: string;
  score: number;
  confidence: number;
  rank: number;
  isActive: boolean;
  metadata: Record<string, unknown>;
}

export class AIRecommendationBuilder {
  private productId = '';
  private product: { id: string; name: string } | null = null;
  private type = 'personalized';
  private strategy = 'collaborative_filtering';
  private algorithm = 'matrix_factorization';
  private score = 0;
  private confidence = 0.5;
  private rank = 0;

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

  setAlgorithm(algorithm: string): this {
    this.algorithm = algorithm;
    return this;
  }

  setScore(score: number): this {
    this.score = score;
    return this;
  }

  setConfidence(confidence: number): this {
    this.confidence = confidence;
    return this;
  }

  setRank(rank: number): this {
    this.rank = rank;
    return this;
  }

  build(): AIRecommendationData {
    return {
      recommendationId: crypto.randomUUID(),
      aiId: '',
      productId: this.productId,
      product: this.product!,
      type: this.type,
      strategy: this.strategy,
      algorithm: this.algorithm,
      score: this.score,
      confidence: this.confidence,
      rank: this.rank,
      isActive: true,
      metadata: {},
    };
  }
}
