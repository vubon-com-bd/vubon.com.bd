import { RecommendationScoreVO } from '../value-objects/primitives/recommendation-score.vo';

export interface FactorVector {
  readonly id: string;
  readonly factors: readonly number[];
}

export class MatrixFactorizationService {
  private dot(a: readonly number[], b: readonly number[]): number {
    let sum = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      sum += a[i] * b[i];
    }
    return sum;
  }

  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }

  /**
   * Predict score for (user, item) pair using their latent factor vectors.
   */
  predict(user: FactorVector, item: FactorVector): RecommendationScoreVO {
    if (user.factors.length !== item.factors.length) {
      throw new Error('MatrixFactorization: factor dimension mismatch');
    }
    return RecommendationScoreVO.create(this.sigmoid(this.dot(user.factors, item.factors)));
  }

  predictBatch(
    user: FactorVector,
    items: readonly FactorVector[],
  ): readonly { readonly itemId: string; readonly score: RecommendationScoreVO }[] {
    return items
      .map((item) => ({ itemId: item.id, score: this.predict(user, item) }))
      .sort((a, b) => b.score.value - a.score.value);
  }
}
