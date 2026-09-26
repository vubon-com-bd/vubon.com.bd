import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class VectorIdVO extends BaseIdVO {
  static create(value: string): VectorIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('VectorId cannot be empty');
    }
    return new VectorIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
