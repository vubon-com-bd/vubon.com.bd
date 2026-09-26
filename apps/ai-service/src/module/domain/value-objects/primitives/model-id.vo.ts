import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ModelIdVO extends BaseIdVO {
  static create(value: string): ModelIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('ModelId cannot be empty');
    }
    return new ModelIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
