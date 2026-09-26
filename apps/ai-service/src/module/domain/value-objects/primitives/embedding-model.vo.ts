import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_EMBEDDING_MODEL } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_EMBEDDING_MODEL));

export class EmbeddingModelVO extends BaseTypeVO<string> {
  static create(raw: string): EmbeddingModelVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid embedding model: ${raw}`);
    }
    return new EmbeddingModelVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
