import { BaseQuantityVO } from '@vubon/shared-kernel/domain/primitives/quantity.vo';
import { AI_FORECAST_HORIZON } from '@vubon/shared-constants/ai';

const VALID = new Set<number>(Object.values(AI_FORECAST_HORIZON));

export class ForecastHorizonVO extends BaseQuantityVO {
  static create(raw: number): ForecastHorizonVO {
    BaseQuantityVO.validatePositive(raw, 'ForecastHorizon');
    if (!Number.isInteger(raw)) {
      throw new Error('ForecastHorizon must be an integer (days)');
    }
    if (!VALID.has(raw)) {
      throw new Error(`Unsupported forecast horizon: ${raw}`);
    }
    return new ForecastHorizonVO(raw);
  }

  private constructor(value: number) {
    super(value);
  }

  get inDays(): number {
    return this.value;
  }
}
