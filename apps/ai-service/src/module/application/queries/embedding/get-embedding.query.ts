import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetEmbeddingQuery extends BaseQuery {
  readonly type = 'ai.embedding.get';
  constructor(public readonly sourceId: string, public readonly sourceType: string) { super(); }
}
