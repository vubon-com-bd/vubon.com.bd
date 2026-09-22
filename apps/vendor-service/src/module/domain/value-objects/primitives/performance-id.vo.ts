import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { InvalidPerformanceIdError } from '../../errors/vendor.errors';

export class PerformanceIdVO extends BaseIdVO {
  static create(value: string): PerformanceIdVO {
    if (!value || value.trim().length === 0) {
      throw new InvalidPerformanceIdError(value);
    }
    return new PerformanceIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
