import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetRefundPublicQuery extends BaseQuery {
  readonly type = 'refund.get_public';
  constructor(public readonly refundId: string) {
    super();
  }
}
