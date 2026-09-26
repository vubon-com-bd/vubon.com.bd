import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_PERSONALIZATION_TYPE } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_PERSONALIZATION_TYPE));

export class PersonalizationTypeVO extends BaseTypeVO<string> {
  static create(raw: string): PersonalizationTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid personalization type: ${raw}`);
    }
    return new PersonalizationTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
