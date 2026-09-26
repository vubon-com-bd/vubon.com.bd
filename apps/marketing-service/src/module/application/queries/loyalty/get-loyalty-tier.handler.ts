import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetLoyaltyTierQuery } from './get-loyalty-tier.query';
import type { LoyaltyTierServiceInterface } from '../../services/interfaces/loyalty-tier.service.interface';
import type { LoyaltyTierResponseDTO } from '../../dtos/responses/loyalty-tier-response.dto';

@QueryHandler(GetLoyaltyTierQuery)
export class GetLoyaltyTierHandler
  extends BaseQueryHandler<GetLoyaltyTierQuery, LoyaltyTierResponseDTO | null>
  implements IQueryHandler<GetLoyaltyTierQuery>
{
  readonly queryType = 'marketing.loyalty.get-tier';

  constructor(private readonly service: LoyaltyTierServiceInterface) {
    super();
  }

  async execute(query: GetLoyaltyTierQuery): Promise<LoyaltyTierResponseDTO | null> {
    return this.service.findByTier(query.tier);
  }
}
