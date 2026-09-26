import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'merge',
  'keep_source',
  'keep_target',
  'sum_quantities',
  'max_quantity',
  'latest_wins',
]);

export class MergeStrategyVO extends BaseTypeVO<string> {
  static create(value: string): MergeStrategyVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid merge strategy: ${value}`);
    }
    return new MergeStrategyVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
