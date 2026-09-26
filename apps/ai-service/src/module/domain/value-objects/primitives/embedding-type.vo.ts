import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_EMBEDDING_TYPE } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_EMBEDDING_TYPE));

export class EmbeddingTypeVO extends BaseTypeVO<string> {
  static create(raw: string): EmbeddingTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid embedding type: ${raw}`);
    }
    return new EmbeddingTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }

  isText(): boolean { return this.value === AI_EMBEDDING_TYPE.TEXT; }
  isImage(): boolean { return this.value === AI_EMBEDDING_TYPE.IMAGE; }
  isMultimodal(): boolean { return this.value === AI_EMBEDDING_TYPE.MULTIMODAL; }
}
