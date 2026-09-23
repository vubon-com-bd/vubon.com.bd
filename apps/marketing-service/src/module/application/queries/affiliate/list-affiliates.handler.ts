import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListAffiliatesQuery } from './list-affiliates.query';
import type { AffiliateRepository } from '../../../domain/repositories/affiliate.repository.interface';
import type { AffiliateResponseDTO } from '../../dtos/responses/affiliate-response.dto';
import { AffiliateMapper } from '../../mappers/affiliate.mapper';

@QueryHandler(ListAffiliatesQuery)
export class ListAffiliatesHandler
  extends BaseQueryHandler<ListAffiliatesQuery, readonly AffiliateResponseDTO[]>
  implements IQueryHandler<ListAffiliatesQuery>
{
  readonly queryType = 'marketing.affiliate.list';

  constructor(
    private readonly repo: AffiliateRepository,
    private readonly mapper: AffiliateMapper,
  ) {
    super();
  }

  async execute(_query: ListAffiliatesQuery): Promise<readonly AffiliateResponseDTO[]> {
    const entities = await this.repo.findAll();
    return entities.map((e) => this.mapper.toDTO(e));
  }
}
