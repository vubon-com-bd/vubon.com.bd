import { SimilarityThresholdVO } from '../value-objects/primitives/similarity-threshold.vo';

export interface VectorInput {
  readonly id: string;
  readonly values: readonly number[];
}

export interface SimilarityMatch {
  readonly vectorId: string;
  readonly score: number;
}

export class VectorSimilarityService {
  private cosine(a: readonly number[], b: readonly number[]): number {
    if (a.length !== b.length) {
      throw new Error('VectorSimilarity: dimension mismatch');
    }
    let dot = 0;
    let magA = 0;
    let magB = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      magA += a[i] * a[i];
      magB += b[i] * b[i];
    }
    if (magA === 0 || magB === 0) return 0;
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }

  private euclidean(a: readonly number[], b: readonly number[]): number {
    if (a.length !== b.length) {
      throw new Error('VectorSimilarity: dimension mismatch');
    }
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      const diff = a[i] - b[i];
      sum += diff * diff;
    }
    return Math.sqrt(sum);
  }

  /**
   * Cosine distance → similarity score in [0,1].
   */
  computeSimilarity(
    a: readonly number[],
    b: readonly number[],
    metric: 'cosine' | 'euclidean' = 'cosine',
  ): number {
    if (metric === 'cosine') {
      const cos = this.cosine(a, b);
      return Math.max(0, Math.min(1, (cos + 1) / 2));
    }
    const dist = this.euclidean(a, b);
    return 1 / (1 + dist);
  }

  findSimilar(
    query: VectorInput,
    candidates: readonly VectorInput[],
    threshold: SimilarityThresholdVO,
    topN: number,
  ): readonly SimilarityMatch[] {
    return candidates
      .filter((c) => c.id !== query.id)
      .map((c) => ({
        vectorId: c.id,
        score: this.computeSimilarity(query.values, c.values, 'cosine'),
      }))
      .filter((m) => m.score >= threshold.value)
      .sort((a, b) => b.score - a.score)
      .slice(0, topN);
  }
}
