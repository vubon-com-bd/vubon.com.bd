import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class TrainingIdVO extends BaseIdVO {
  static create(value: string): TrainingIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('TrainingId cannot be empty');
    }
    return new TrainingIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
