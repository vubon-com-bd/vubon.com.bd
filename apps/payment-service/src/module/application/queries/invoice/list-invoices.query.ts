import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListInvoicesQuery extends BaseQuery {
  readonly type = 'invoice.list';
  constructor(public readonly userId?: string) { super(); }
}
