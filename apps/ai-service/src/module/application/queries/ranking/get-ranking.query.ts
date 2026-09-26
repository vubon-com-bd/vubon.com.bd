import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetRankingQuery extends BaseQuery {
  readonly type = 'ai.ranking.get';
  constructor(public readonly rankingId: string) { super(); }
}
