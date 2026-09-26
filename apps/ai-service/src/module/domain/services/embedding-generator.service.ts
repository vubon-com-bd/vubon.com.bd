import { EmbeddingDimensionVO } from '../value-objects/primitives/embedding-dimension.vo';
import { EmbeddingModelVO } from '../value-objects/primitives/embedding-model.vo';

export interface EmbeddingInput {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly content: string;
}

export interface GeneratedEmbedding {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly vector: readonly number[];
  readonly dimension: number;
  readonly model: string;
}

export class EmbeddingGeneratorService {
  /**
   * Normalize a raw vector to unit length (L2 normalization).
   */
  normalize(vector: readonly number[]): readonly number[] {
    const magnitude = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0));
    if (magnitude === 0) return vector;
    return vector.map((v) => v / magnitude);
  }

  /**
   * Truncate or pad vector to target dimension.
   */
  resize(vector: readonly number[], targetDim: EmbeddingDimensionVO): readonly number[] {
    if (vector.length === targetDim.value) return vector;
    if (vector.length > targetDim.value) {
      return vector.slice(0, targetDim.value);
    }
    const padding = new Array(targetDim.value - vector.length).fill(0);
    return [...vector, ...padding];
  }

  /**
   * Validate a generated embedding against expected dimension.
   */
  validate(embedding: GeneratedEmbedding, expected: EmbeddingDimensionVO): boolean {
    return embedding.vector.length === expected.value;
  }

  /**
   * Build a normalized, validated embedding.
   */
  build(
    input: EmbeddingInput,
    rawVector: readonly number[],
    model: EmbeddingModelVO,
    dimension: EmbeddingDimensionVO,
  ): GeneratedEmbedding {
    const resized = this.resize(rawVector, dimension);
    const normalized = this.normalize(resized);
    return {
      sourceId: input.sourceId,
      sourceType: input.sourceType,
      vector: Object.freeze([...normalized]),
      dimension: dimension.value,
      model: model.value,
    };
  }
}
