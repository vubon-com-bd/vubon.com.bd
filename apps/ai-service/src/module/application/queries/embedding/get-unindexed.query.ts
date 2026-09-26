import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUnindexedEmbeddingsQuery extends BaseQuery {
  readonly type = 'ai.embedding.list-unindexed';
  constructor() { super(); }
}
