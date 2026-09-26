import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ForecastIdVO extends BaseIdVO {
  static create(value: string): ForecastIdVO {
    if (!value || value.trim().length === 0) {
      throw new Error('ForecastId cannot be empty');
    }
    return new ForecastIdVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}
