import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetDispatchQuery } from './get-dispatch.query';
import type { DispatchRepository } from '../../../domain/repositories/dispatch.repository.interface';
import { DispatchIdVO } from '../../../domain/value-objects/primitives/dispatch-id.vo';
import type { DispatchResponseDTO } from '../../dtos/responses/dispatch-response.dto';

@QueryHandler(GetDispatchQuery)
export class GetDispatchHandler
  extends BaseQueryHandler<GetDispatchQuery, DispatchResponseDTO | null>
  implements IQueryHandler<GetDispatchQuery>
{
  readonly queryType = 'logistics.dispatch.get';

  constructor(private readonly repo: DispatchRepository) {
    super();
  }

  async execute(query: GetDispatchQuery): Promise<DispatchResponseDTO | null> {
    const entity = await this.repo.findById(DispatchIdVO.create(query.dispatchId));
    if (!entity) return null;
    return { id: entity.id.value, createdAt: entity.createdAt, updatedAt: entity.updatedAt } as unknown as DispatchResponseDTO;
  }
}
