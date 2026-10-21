/**
 * GetRefundQuery
 * @module payment-service/application/queries/refund
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetRefundQuery extends BaseQuery {
  readonly type = 'payment.refund.get';
  constructor(public readonly refundId: string) {
    super();
  }
}
