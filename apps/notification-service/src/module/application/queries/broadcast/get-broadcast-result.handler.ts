import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetBroadcastResultQuery } from './get-broadcast-result.query.js';
import {
  BROADCAST_SERVICE,
  type IBroadcastService,
} from '@application/services/interfaces/broadcast.service.interface.js';
import type { BroadcastResultResponseDTO } from '@application/dtos/responses/broadcast-response.dto.js';

@QueryHandler(GetBroadcastResultQuery)
export class GetBroadcastResultHandler
  implements IQueryHandler<GetBroadcastResultQuery, BroadcastResultResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(q: GetBroadcastResultQuery): Promise<BroadcastResultResponseDTO> {
    return this.service.getResult(q.broadcastId);
  }
}
