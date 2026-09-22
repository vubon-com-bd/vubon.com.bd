import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'percentage',
  'fixed',
  'flat',
  'tiered',
]);

export class SplitTypeVO extends BaseTypeVO<string> {
  static create(value: string): SplitTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid split type: ${value}`);
    }
    return new SplitTypeVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
