import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSlaQuery } from './get-sla.query';
import type { SlaRepository } from '../../../domain/repositories/sla.repository.interface';
import { SlaIdVO } from '../../../domain/value-objects/primitives/sla-id.vo';
import { SlaNotFoundError } from '../../../domain/errors/sla.errors';
import type { SlaResponseDTO } from '../../dtos/responses/sla-response.dto';

@QueryHandler(GetSlaQuery)
export class GetSlaHandler
  extends BaseQueryHandler<GetSlaQuery, SlaResponseDTO>
  implements IQueryHandler<GetSlaQuery>
{
  readonly queryType = 'support.sla.get';

  constructor(private readonly slaRepo: SlaRepository) {
    super();
  }

  async execute(query: GetSlaQuery): Promise<SlaResponseDTO> {
    const s = await this.slaRepo.findById(SlaIdVO.create(query.slaId));
    if (!s) throw new SlaNotFoundError(query.slaId);
    return {
      id: s.id.value,
      name: s.name,
      type: s.type.value,
      target: s.target.value,
      priority: s.priority,
      status: s.status.value,
      businessHoursOnly: s.businessHoursOnly,
    };
  }
}
