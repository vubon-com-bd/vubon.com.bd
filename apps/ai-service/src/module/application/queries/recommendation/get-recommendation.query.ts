import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetRecommendationQuery extends BaseQuery {
  readonly type = 'ai.recommendation.get';
  constructor(public readonly recommendationId: string) { super(); }
}
