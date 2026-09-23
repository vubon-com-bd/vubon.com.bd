import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAffiliateByCodeQuery } from './get-affiliate-by-code.query';
import type { AffiliateServiceInterface } from '../../services/interfaces/affiliate.service.interface';
import type { AffiliateResponseDTO } from '../../dtos/responses/affiliate-response.dto';

@QueryHandler(GetAffiliateByCodeQuery)
export class GetAffiliateByCodeHandler
  extends BaseQueryHandler<GetAffiliateByCodeQuery, AffiliateResponseDTO | null>
  implements IQueryHandler<GetAffiliateByCodeQuery>
{
  readonly queryType = 'marketing.affiliate.get-by-code';

  constructor(private readonly service: AffiliateServiceInterface) {
    super();
  }

  async execute(query: GetAffiliateByCodeQuery): Promise<AffiliateResponseDTO | null> {
    return this.service.findByCode(query.code);
  }
}
