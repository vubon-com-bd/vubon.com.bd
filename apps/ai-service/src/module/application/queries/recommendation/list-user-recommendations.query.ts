import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListUserRecommendationsQuery extends BaseQuery {
  readonly type = 'ai.recommendation.list-for-user';
  constructor(public readonly userId: string, public readonly limit: number = 10) { super(); }
}
