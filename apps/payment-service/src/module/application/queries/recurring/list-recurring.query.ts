import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListRecurringQuery extends BaseQuery {
  readonly type = 'recurring.list';
  constructor(public readonly paymentId: string) { super(); }
}
