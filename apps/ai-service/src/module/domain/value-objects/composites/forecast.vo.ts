import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ForecastIdVO } from '../primitives/forecast-id.vo';
import { ForecastHorizonVO } from '../primitives/forecast-horizon.vo';
import { ForecastResultVO } from './forecast-result.vo';

export interface ForecastProps {
  readonly id: ForecastIdVO;
  readonly target: string;
  readonly horizon: ForecastHorizonVO;
  readonly model: string;
  readonly result: ForecastResultVO;
}

export class ForecastVO extends BaseVO<ForecastProps> {
  static create(props: ForecastProps): ForecastVO {
    return new ForecastVO(props);
  }

  private constructor(props: ForecastProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): ForecastIdVO { return this.value.id; }
  get target(): string { return this.value.target; }
  get horizon(): ForecastHorizonVO { return this.value.horizon; }
  get model(): string { return this.value.model; }
  get result(): ForecastResultVO { return this.value.result; }

  hasData(): boolean {
    return this.value.result.size() > 0;
  }
}
