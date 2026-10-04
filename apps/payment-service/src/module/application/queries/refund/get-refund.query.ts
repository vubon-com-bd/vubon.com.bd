import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetRefundQuery extends BaseQuery {
  readonly type = 'refund.get';
  constructor(public readonly refundId: string) {
    super();
  }
}
