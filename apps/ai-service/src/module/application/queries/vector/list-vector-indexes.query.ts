import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListVectorIndexesQuery extends BaseQuery {
  readonly type = 'ai.vector.list-indexes';
  constructor(public readonly provider?: string) { super(); }
}
