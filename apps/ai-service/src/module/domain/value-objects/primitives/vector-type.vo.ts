import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_VECTOR_DB } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_VECTOR_DB));

export class VectorTypeVO extends BaseTypeVO<string> {
  static create(raw: string): VectorTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid vector type: ${raw}`);
    }
    return new VectorTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
