import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListAbandonedQuery extends BaseQuery {
  readonly type = 'abandoned.list';
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) { super(); }
}
