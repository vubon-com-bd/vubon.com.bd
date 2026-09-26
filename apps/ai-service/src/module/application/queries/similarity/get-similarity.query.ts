import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSimilarityQuery extends BaseQuery {
  readonly type = 'ai.similarity.get';
  constructor(public readonly similarityId: string) { super(); }
}
