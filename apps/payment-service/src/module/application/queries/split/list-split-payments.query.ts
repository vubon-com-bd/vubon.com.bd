import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSplitPaymentsQuery extends BaseQuery {
  readonly type = 'split.list';
  constructor(public readonly paymentId: string) { super(); }
}
