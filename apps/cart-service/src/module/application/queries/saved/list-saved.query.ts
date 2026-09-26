import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSavedQuery extends BaseQuery {
  readonly type = 'cart.saved.list';
  constructor(public readonly userId: string) { super(); }
}
