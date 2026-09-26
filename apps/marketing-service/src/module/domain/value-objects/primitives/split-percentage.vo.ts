import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class SplitPercentageVO extends BaseCodeVO {
  static create(raw: string): SplitPercentageVO {
    if (!raw || raw.trim().length === 0) {
      throw new Error('SplitPercentage cannot be empty');
    }
    const num = Number(raw);
    if (Number.isNaN(num) || num < 0 || num > 100) {
      throw new Error('SplitPercentage must be 0-100');
    }
    return new SplitPercentageVO(raw);
  }

  private constructor(value: string) {
    super(value);
  }
}
