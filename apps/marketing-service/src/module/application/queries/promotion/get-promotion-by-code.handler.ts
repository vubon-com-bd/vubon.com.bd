import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPromotionByCodeQuery } from './get-promotion-by-code.query';
import type { PromotionServiceInterface } from '../../services/interfaces/promotion.service.interface';
import type { PromotionResponseDTO } from '../../dtos/responses/promotion-response.dto';

@QueryHandler(GetPromotionByCodeQuery)
export class GetPromotionByCodeHandler
  extends BaseQueryHandler<GetPromotionByCodeQuery, PromotionResponseDTO | null>
  implements IQueryHandler<GetPromotionByCodeQuery>
{
  readonly queryType = 'marketing.promotion.get-by-code';

  constructor(private readonly promotionService: PromotionServiceInterface) {
    super();
  }

  async execute(query: GetPromotionByCodeQuery): Promise<PromotionResponseDTO | null> {
    return this.promotionService.findByCode(query.code);
  }
}
