import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPushQuery } from './get-push.query.js';
import { PUSH_SERVICE, type IPushService } from '../../services/interfaces/push.service.interface.js';
import type { PushResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(GetPushQuery)
export class GetPushHandler implements IQueryHandler<GetPushQuery, PushResponseDTO> {
  constructor(@Inject(PUSH_SERVICE) private readonly service: IPushService) {}

  async execute(q: GetPushQuery): Promise<PushResponseDTO> {
    return this.service.getById({ pushId: q.pushId });
  }
}
