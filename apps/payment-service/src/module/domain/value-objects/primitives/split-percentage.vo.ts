import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives';

export class SplitPercentageVO extends BaseCodeVO {
  static create(value: number): SplitPercentageVO {
    if (!Number.isFinite(value) || value <= 0 || value > 100) {
      throw new Error('Split percentage must be between 0 and 100');
    }
    return new SplitPercentageVO(String(value));
  }

  get percentage(): number {
    return Number(this.value);
  }

  private constructor(value: string) {
    super(value);
  }
}
