import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetBroadcastQuery } from './get-broadcast.query';
import type { BroadcastRepository } from '../../../domain/repositories/broadcast.repository.interface';
import { BroadcastIdVO } from '../../../domain/value-objects/primitives/broadcast-id.vo';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto';

@QueryHandler(GetBroadcastQuery)
export class GetBroadcastHandler
  extends BaseQueryHandler<GetBroadcastQuery, BroadcastResponseDTO | null>
  implements IQueryHandler<GetBroadcastQuery>
{
  readonly queryType = 'broadcast.get';

  constructor(private readonly broadcastRepo: BroadcastRepository) {
    super();
  }

  async execute(query: GetBroadcastQuery): Promise<BroadcastResponseDTO | null> {
    const entity = await this.broadcastRepo.findById(BroadcastIdVO.create(query.broadcastId));
    if (!entity) return null;
    return {
      id: entity.id.value,
      type: entity.type.value,
      status: entity.status.value,
      target: entity.audience.value,
      content: entity.content,
      scheduledAt: entity.scheduledAt?.toISOString() ?? null,
      startedAt: entity.startedAt?.toISOString() ?? null,
      completedAt: entity.completedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
    };
  }
}
