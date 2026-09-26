import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { AI_TRAINING_TYPE } from '@vubon/shared-constants/ai';

const VALID = new Set<string>(Object.values(AI_TRAINING_TYPE));

export class TrainingTypeVO extends BaseTypeVO<string> {
  static create(raw: string): TrainingTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid training type: ${raw}`);
    }
    return new TrainingTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
