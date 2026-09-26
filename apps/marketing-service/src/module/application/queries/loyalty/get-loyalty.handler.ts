import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetLoyaltyQuery } from './get-loyalty.query';
import type { LoyaltyServiceInterface } from '../../services/interfaces/loyalty.service.interface';
import type { LoyaltyResponseDTO } from '../../dtos/responses/loyalty-response.dto';

@QueryHandler(GetLoyaltyQuery)
export class GetLoyaltyHandler
  extends BaseQueryHandler<GetLoyaltyQuery, LoyaltyResponseDTO | null>
  implements IQueryHandler<GetLoyaltyQuery>
{
  readonly queryType = 'marketing.loyalty.get';

  constructor(private readonly service: LoyaltyServiceInterface) {
    super();
  }

  async execute(query: GetLoyaltyQuery): Promise<LoyaltyResponseDTO | null> {
    return this.service.findByUser(query.userId);
  }
}
