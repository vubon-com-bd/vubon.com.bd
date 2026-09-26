import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';

export class LeadScoreVO extends BaseQuantityVO {
  static create(raw: number): LeadScoreVO {
    if (!Number.isInteger(raw) || raw < 0 || raw > 100) {
      throw new Error('LeadScore must be between 0-100');
    }
    return new LeadScoreVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }
}
