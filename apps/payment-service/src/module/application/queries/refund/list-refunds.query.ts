import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListRefundsQuery extends BaseQuery {
  readonly type = 'refund.list';

  constructor(public readonly paymentId: string) {
    super();
  }
}
