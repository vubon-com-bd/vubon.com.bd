import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPromotionQuery } from './get-promotion.query';
import type { PromotionRepository } from '../../../domain/repositories/promotion.repository.interface';
import { PromotionIdVO } from '../../../domain/value-objects/primitives/promotion-id.vo';
import type { PromotionResponseDTO } from '../../dtos/responses/promotion-response.dto';
import { PromotionMapper } from '../../mappers/promotion.mapper';

@QueryHandler(GetPromotionQuery)
export class GetPromotionHandler
  extends BaseQueryHandler<GetPromotionQuery, PromotionResponseDTO | null>
  implements IQueryHandler<GetPromotionQuery>
{
  readonly queryType = 'marketing.promotion.get';

  constructor(
    private readonly repo: PromotionRepository,
    private readonly mapper: PromotionMapper,
  ) {
    super();
  }

  async execute(query: GetPromotionQuery): Promise<PromotionResponseDTO | null> {
    const entity = await this.repo.findById(PromotionIdVO.create(query.promotionId));
    return entity ? this.mapper.toDTO(entity) : null;
  }
}
