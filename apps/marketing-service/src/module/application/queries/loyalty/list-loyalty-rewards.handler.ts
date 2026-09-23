import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListLoyaltyRewardsQuery } from './list-loyalty-rewards.query';
import type { LoyaltyRewardServiceInterface } from '../../services/interfaces/loyalty-reward.service.interface';
import type { LoyaltyRewardResponseDTO } from '../../dtos/responses/loyalty-reward-response.dto';

@QueryHandler(ListLoyaltyRewardsQuery)
export class ListLoyaltyRewardsHandler
  extends BaseQueryHandler<ListLoyaltyRewardsQuery, readonly LoyaltyRewardResponseDTO[]>
  implements IQueryHandler<ListLoyaltyRewardsQuery>
{
  readonly queryType = 'marketing.loyalty.list-rewards';

  constructor(private readonly service: LoyaltyRewardServiceInterface) {
    super();
  }

  async execute(_query: ListLoyaltyRewardsQuery): Promise<readonly LoyaltyRewardResponseDTO[]> {
    return this.service.findActive();
  }
}
