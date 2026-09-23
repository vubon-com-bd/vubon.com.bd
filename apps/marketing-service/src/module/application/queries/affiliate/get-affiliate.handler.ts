import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAffiliateQuery } from './get-affiliate.query';
import type { AffiliateRepository } from '../../../domain/repositories/affiliate.repository.interface';
import { AffiliateIdVO } from '../../../domain/value-objects/primitives/affiliate-id.vo';
import type { AffiliateResponseDTO } from '../../dtos/responses/affiliate-response.dto';
import { AffiliateMapper } from '../../mappers/affiliate.mapper';

@QueryHandler(GetAffiliateQuery)
export class GetAffiliateHandler
  extends BaseQueryHandler<GetAffiliateQuery, AffiliateResponseDTO | null>
  implements IQueryHandler<GetAffiliateQuery>
{
  readonly queryType = 'marketing.affiliate.get';

  constructor(
    private readonly repo: AffiliateRepository,
    private readonly mapper: AffiliateMapper,
  ) {
    super();
  }

  async execute(query: GetAffiliateQuery): Promise<AffiliateResponseDTO | null> {
    const entity = await this.repo.findById(AffiliateIdVO.create(query.affiliateId));
    return entity ? this.mapper.toDTO(entity) : null;
  }
}
