import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID = new Set<string>([
  'model_performance',
  'usage',
  'prediction',
  'training',
  'inference',
  'cost',
]);

export class AnalyticsTypeVO extends BaseTypeVO<string> {
  static create(raw: string): AnalyticsTypeVO {
    if (!VALID.has(raw)) {
      throw new Error(`Invalid analytics type: ${raw}`);
    }
    return new AnalyticsTypeVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
