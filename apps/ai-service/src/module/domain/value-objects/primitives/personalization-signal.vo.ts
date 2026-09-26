import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_PERSONALIZATION_SIGNAL } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_PERSONALIZATION_SIGNAL));

export class PersonalizationSignalVO extends BaseTypeVO<string> {
  static create(raw: string): PersonalizationSignalVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid personalization signal: ${raw}`);
    }
    return new PersonalizationSignalVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
