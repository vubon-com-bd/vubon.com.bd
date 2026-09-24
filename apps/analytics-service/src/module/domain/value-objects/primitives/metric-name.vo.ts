import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';

export class MetricNameVO extends BaseNameVO {
  private static readonly MAX_LENGTH = 100;

  static create(raw: string): MetricNameVO {
    const trimmed = raw.trim();
    if (trimmed.length === 0) {
      throw new Error('MetricName cannot be empty');
    }
    if (trimmed.length > MetricNameVO.MAX_LENGTH) {
      throw new Error(`MetricName too long (max ${MetricNameVO.MAX_LENGTH})`);
    }
    return new MetricNameVO(trimmed);
  }

  private constructor(value: string) {
    super(value);
  }

  get isQualified(): boolean {
    return this.value.includes('.');
  }

  get prefix(): string {
    return this.value.split('.')[0] ?? this.value;
  }
}
