import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { InvalidScoreError } from '../../errors/vendor.errors';

export class ScoreValueVO extends BaseCodeVO {
  static create(value: number): ScoreValueVO {
    if (!Number.isFinite(value) || value < 0 || value > 100) {
      throw new InvalidScoreError(String(value));
    }
    return new ScoreValueVO(String(value));
  }

  get numeric(): number {
    return Number(this.value);
  }

  private constructor(value: string) {
    super(value);
  }
}
