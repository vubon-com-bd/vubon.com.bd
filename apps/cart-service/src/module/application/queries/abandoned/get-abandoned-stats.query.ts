import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetAbandonedStatsQuery extends BaseQuery {
  readonly type = 'abandoned.stats';
  constructor() { super(); }
}
