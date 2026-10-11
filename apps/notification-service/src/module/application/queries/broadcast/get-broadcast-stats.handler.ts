import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBroadcastStatsQuery } from './get-broadcast-stats.query.js';
import { BROADCAST_SERVICE, type IBroadcastService } from '../../services/interfaces/broadcast.service.interface.js';
import type { BroadcastStatsResponseDTO } from '../../dtos/responses/broadcast-response.dto.js';

@QueryHandler(GetBroadcastStatsQuery)
export class GetBroadcastStatsHandler
  implements IQueryHandler<GetBroadcastStatsQuery, BroadcastStatsResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(q: GetBroadcastStatsQuery): Promise<BroadcastStatsResponseDTO> {
    return this.service.getStats({ broadcastId: q.broadcastId });
  }
}
