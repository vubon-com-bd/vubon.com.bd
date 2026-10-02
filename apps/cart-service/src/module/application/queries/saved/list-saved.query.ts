import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListSavedQuery extends BaseQuery {
  readonly type = 'saved.list';
  constructor(
    public readonly userId: string,
    public readonly page: number = 1,
    public readonly limit: number = 20,
  ) { super(); }
}
