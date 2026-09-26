import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class InsightIdVO extends BaseIdVO {
  static create(value: string): InsightIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('InsightId cannot be empty');
    }
    return new InsightIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
