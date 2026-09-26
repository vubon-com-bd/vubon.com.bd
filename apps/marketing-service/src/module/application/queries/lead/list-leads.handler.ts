import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListLeadsQuery } from './list-leads.query';
import type { LeadRepository } from '../../../domain/repositories/lead.repository.interface';
import type { LeadResponseDTO } from '../../dtos/responses/lead-response.dto';
import { LeadMapper } from '../../mappers/lead.mapper';

@QueryHandler(ListLeadsQuery)
export class ListLeadsHandler
  extends BaseQueryHandler<ListLeadsQuery, readonly LeadResponseDTO[]>
  implements IQueryHandler<ListLeadsQuery>
{
  readonly queryType = 'marketing.lead.list';

  constructor(
    private readonly repo: LeadRepository,
    private readonly mapper: LeadMapper,
  ) {
    super();
  }

  async execute(_query: ListLeadsQuery): Promise<readonly LeadResponseDTO[]> {
    const entities = await this.repo.findAll();
    return entities.map((e) => this.mapper.toDTO(e));
  }
}
