import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_VECTOR_INDEX_TYPE } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_VECTOR_INDEX_TYPE));

export class VectorIndexTypeVO extends BaseTypeVO<string> {
  static create(raw: string): VectorIndexTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid vector index type: ${raw}`);
    }
    return new VectorIndexTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
