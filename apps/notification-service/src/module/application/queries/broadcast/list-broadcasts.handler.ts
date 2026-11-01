import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListBroadcastsQuery } from './list-broadcasts.query.js';
import {
  BROADCAST_SERVICE,
  type IBroadcastService,
} from '@application/services/interfaces/broadcast.service.interface.js';
import type { BroadcastListResponseDTO } from '@application/dtos/responses/broadcast-response.dto.js';

@QueryHandler(ListBroadcastsQuery)
export class ListBroadcastsHandler
  implements IQueryHandler<ListBroadcastsQuery, BroadcastListResponseDTO>
{
  constructor(@Inject(BROADCAST_SERVICE) private readonly service: IBroadcastService) {}

  async execute(q: ListBroadcastsQuery): Promise<BroadcastListResponseDTO> {
    return this.service.list(q.options);
  }
}
