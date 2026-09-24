import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListBroadcastsQuery } from './list-broadcasts.query';
import type { BroadcastRepository } from '../../../domain/repositories/broadcast.repository.interface';
import { BroadcastStatusVO } from '../../../domain/value-objects/primitives/broadcast-status.vo';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto';

@QueryHandler(ListBroadcastsQuery)
export class ListBroadcastsHandler
  extends BaseQueryHandler<ListBroadcastsQuery, readonly BroadcastResponseDTO[]>
  implements IQueryHandler<ListBroadcastsQuery>
{
  readonly queryType = 'broadcast.list';

  constructor(private readonly broadcastRepo: BroadcastRepository) {
    super();
  }

  async execute(query: ListBroadcastsQuery): Promise<readonly BroadcastResponseDTO[]> {
    const entities = query.status
      ? await this.broadcastRepo.findByStatus(BroadcastStatusVO.create(query.status))
      : await this.broadcastRepo.findActive();

    return entities.map((e) => ({
      id: e.id.value,
      type: e.type.value,
      status: e.status.value,
      target: e.audience.value,
      content: e.content,
      scheduledAt: e.scheduledAt?.toISOString() ?? null,
      startedAt: e.startedAt?.toISOString() ?? null,
      completedAt: e.completedAt?.toISOString() ?? null,
      createdAt: e.createdAt,
    }));
  }
}
