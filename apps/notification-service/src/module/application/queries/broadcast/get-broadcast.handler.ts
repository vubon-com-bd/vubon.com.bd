import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBroadcastQuery } from './get-broadcast.query.js';
import { BROADCAST_SERVICE, type IBroadcastService } from '../../services/interfaces/broadcast.service.interface.js';
import type { BroadcastResponseDTO } from '../../dtos/responses/broadcast-response.dto.js';

@QueryHandler(GetBroadcastQuery)
export class GetBroadcastHandler
  implements IQueryHandler<GetBroadcastQuery, BroadcastResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(q: GetBroadcastQuery): Promise<BroadcastResponseDTO> {
    return this.service.getById({ broadcastId: q.broadcastId });
  }
}
