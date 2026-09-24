import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class MetricIdVO extends BaseIdVO {
  static create(raw: string): MetricIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('MetricId cannot be empty');
    }
    return new MetricIdVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
