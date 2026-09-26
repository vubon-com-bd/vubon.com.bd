import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListForecastsQuery extends BaseQuery {
  readonly type = 'ai.forecast.list';
  constructor(public readonly target: string, public readonly limit: number = 10) { super(); }
}
