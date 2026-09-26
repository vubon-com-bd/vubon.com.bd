import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_EMBEDDING_MODEL } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_EMBEDDING_MODEL));

export class SearchModelVO extends BaseTypeVO<string> {
  static create(raw: string): SearchModelVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid search model: ${raw}`);
    }
    return new SearchModelVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
