import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetLeadQuery } from './get-lead.query';
import type { LeadRepository } from '../../../domain/repositories/lead.repository.interface';
import { LeadIdVO } from '../../../domain/value-objects/primitives/lead-id.vo';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';
import { LeadMapper } from '../../mappers/lead.mapper';

@QueryHandler(GetLeadQuery)
export class GetLeadHandler
  extends BaseQueryHandler<GetLeadQuery, LeadResponseDTO | null>
  implements IQueryHandler<GetLeadQuery>
{
  readonly queryType = 'marketing.lead.get';

  constructor(
    private readonly repo: LeadRepository,
    private readonly mapper: LeadMapper,
  ) {
    super();
  }

  async execute(query: GetLeadQuery): Promise<LeadResponseDTO | null> {
    const entity = await this.repo.findById(LeadIdVO.create(query.leadId));
    return entity ? this.mapper.toDTO(entity) : null;
  }
}
