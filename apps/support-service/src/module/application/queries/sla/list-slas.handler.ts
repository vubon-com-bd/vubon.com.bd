import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSlasQuery } from './list-slas.query';
import type { SlaRepository } from '../../../domain/repositories/sla.repository.interface';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';

@QueryHandler(ListSlasQuery)
export class ListSlasHandler
  extends BaseQueryHandler<ListSlasQuery, readonly SlaResponseDTO[]>
  implements IQueryHandler<ListSlasQuery>
{
  readonly queryType = 'support.sla.list';

  constructor(private readonly slaRepo: SlaRepository) {
    super();
  }

  async execute(_query: ListSlasQuery): Promise<readonly SlaResponseDTO[]> {
    const slas = await this.slaRepo.findAll();
    return slas.map((s) => ({
      id: s.id.value,
      name: s.name,
      type: s.type.value,
      target: s.target.value,
      priority: s.priority,
      status: s.status.value,
      businessHoursOnly: s.businessHoursOnly,
    }));
  }
}
