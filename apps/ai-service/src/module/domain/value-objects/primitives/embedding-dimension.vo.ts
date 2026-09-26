import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';
import { AI_EMBEDDING_DIMENSION } from '@vubon/shared-constants/ai';

const VALID = new Set<number>(Object.values(AI_EMBEDDING_DIMENSION));

export class EmbeddingDimensionVO extends BaseQuantityVO {
  static create(raw: number): EmbeddingDimensionVO {
    BaseQuantityVO.validatePositive(raw, 'EmbeddingDimension');
    if (!Number.isInteger(raw)) {
      throw new Error('EmbeddingDimension must be an integer');
    }
    if (!VALID.has(raw)) {
      throw new Error(`Unsupported embedding dimension: ${raw}`);
    }
    return new EmbeddingDimensionVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }

  isLarge(): boolean {
    return this.value >= AI_EMBEDDING_DIMENSION.DIM_1536;
  }
}
