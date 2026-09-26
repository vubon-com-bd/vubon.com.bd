import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListPromotionsQuery } from './list-promotions.query';
import type { PromotionRepository } from '../../../domain/repositories/promotion.repository.interface';
import type { PromotionResponseDTO } from '../../dtos/responses/promotion-response.dto';
import { PromotionMapper } from '../../mappers/promotion.mapper';

@QueryHandler(ListPromotionsQuery)
export class ListPromotionsHandler
  extends BaseQueryHandler<ListPromotionsQuery, readonly PromotionResponseDTO[]>
  implements IQueryHandler<ListPromotionsQuery>
{
  readonly queryType = 'marketing.promotion.list';

  constructor(
    private readonly repo: PromotionRepository,
    private readonly mapper: PromotionMapper,
  ) {
    super();
  }

  async execute(_query: ListPromotionsQuery): Promise<readonly PromotionResponseDTO[]> {
    const entities = await this.repo.findActive();
    return entities.map((e) => this.mapper.toDTO(e));
  }
}
