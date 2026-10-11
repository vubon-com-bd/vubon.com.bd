import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInAppQuery } from './get-in-app.query.js';
import { IN_APP_SERVICE, type IInAppService } from '../../services/interfaces/in-app.service.interface.js';
import type { InAppResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(GetInAppQuery)
export class GetInAppHandler implements IQueryHandler<GetInAppQuery, InAppResponseDTO> {
  constructor(@Inject(IN_APP_SERVICE) private readonly service: IInAppService) {}

  async execute(q: GetInAppQuery): Promise<InAppResponseDTO> {
    return this.service.getById(q.notificationId, q.userId);
  }
}
