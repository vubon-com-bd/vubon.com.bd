import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBroadcastProgressQuery } from './get-broadcast-progress.query.js';
import { BROADCAST_SERVICE, type IBroadcastService } from '../../services/interfaces/broadcast.service.interface.js';
import type { BroadcastProgressResponseDTO } from '../../dtos/responses/broadcast-response.dto.js';

@QueryHandler(GetBroadcastProgressQuery)
export class GetBroadcastProgressHandler
  implements IQueryHandler<GetBroadcastProgressQuery, BroadcastProgressResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(q: GetBroadcastProgressQuery): Promise<BroadcastProgressResponseDTO> {
    return this.service.getProgress(q.broadcastId);
  }
}
