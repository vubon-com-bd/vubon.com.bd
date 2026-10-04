import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListWebhookEventsQuery } from './list-webhook-events.query.js';
import {
  WEBHOOK_SERVICE,
  type IWebhookService,
} from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookListResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@QueryHandler(ListWebhookEventsQuery)
export class ListWebhookEventsHandler
  implements IQueryHandler<ListWebhookEventsQuery, WebhookListResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(q: ListWebhookEventsQuery): Promise<WebhookListResponseDTO> {
    return this.service.list(q.options);
  }
}
