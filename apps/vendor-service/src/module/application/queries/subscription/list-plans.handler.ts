import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPlansQuery } from './list-plans.query';

export interface SubscriptionPlanDto {
  readonly code: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly features: readonly string[];
}

@QueryHandler(ListPlansQuery)
export class ListPlansHandler
  extends BaseQueryHandler<ListPlansQuery, readonly SubscriptionPlanDto[]>
  implements IQueryHandler<ListPlansQuery>
{
  readonly queryType = 'vendor.subscription.list-plans';

  constructor() {
    super();
  }

  async execute(_query: ListPlansQuery): Promise<readonly SubscriptionPlanDto[]> {
    return [
      { code: 'free', name: 'Free', price: 0, currency: 'BDT', features: ['Basic listing'] },
      { code: 'basic', name: 'Basic', price: 500, currency: 'BDT', features: ['Basic listing', 'Analytics'] },
      { code: 'pro', name: 'Pro', price: 1500, currency: 'BDT', features: ['Priority listing', 'Analytics', 'API'] },
      { code: 'business', name: 'Business', price: 3000, currency: 'BDT', features: ['All Pro features', 'Custom domain'] },
      { code: 'enterprise', name: 'Enterprise', price: 10000, currency: 'BDT', features: ['All features', 'Dedicated support'] },
    ];
  }
}
