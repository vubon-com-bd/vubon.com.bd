import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class DimensionIdVO extends BaseIdVO {
  static create(raw: string): DimensionIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('DimensionId cannot be empty');
    }
    return new DimensionIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
