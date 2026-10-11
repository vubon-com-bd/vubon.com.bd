import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPushQuery } from './list-push.query.js';
import { PUSH_SERVICE, type IPushService } from '../../services/interfaces/push.service.interface.js';
import type { PushListResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(ListPushQuery)
export class ListPushHandler implements IQueryHandler<ListPushQuery, PushListResponseDTO> {
  constructor(@Inject(PUSH_SERVICE) private readonly service: IPushService) {}

  async execute(q: ListPushQuery): Promise<PushListResponseDTO> {
    return this.service.list(q.options);
  }
}
