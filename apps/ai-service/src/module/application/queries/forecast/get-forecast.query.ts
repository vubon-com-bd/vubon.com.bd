import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetForecastQuery extends BaseQuery {
  readonly type = 'ai.forecast.get';
  constructor(public readonly forecastId: string) { super(); }
}
