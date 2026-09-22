import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export interface ListPaymentsFilter {
  readonly userId?: string;
  readonly orderId?: string;
  readonly status?: string;
  readonly gateway?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export class ListPaymentsQuery extends BaseQuery {
  readonly type = 'payment.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly filter?: ListPaymentsFilter,
  ) {
    super();
  }
}
