import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetPaymentMethodsAnalyticsQuery extends BaseQuery {
  readonly type = 'analytics.get-payment-methods';

  constructor() {
    super();
  }
}
