import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInAppInboxQuery } from './get-in-app-inbox.query.js';
import { IN_APP_SERVICE, type IInAppService } from '../../services/interfaces/in-app.service.interface.js';
import type { InAppInboxResponseDTO } from '../../dtos/responses/channel-response.dto.js';

@QueryHandler(GetInAppInboxQuery)
export class GetInAppInboxHandler
  implements IQueryHandler<GetInAppInboxQuery, InAppInboxResponseDTO>
{
  constructor(@Inject(IN_APP_SERVICE) private readonly service: IInAppService) {}

  async execute(q: GetInAppInboxQuery): Promise<InAppInboxResponseDTO> {
    return this.service.inbox(q.options);
  }
}
