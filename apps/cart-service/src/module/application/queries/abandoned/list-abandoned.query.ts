import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListAbandonedQuery extends BaseQuery {
  readonly type = 'abandoned.list';
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
  ) { super(); }
}
