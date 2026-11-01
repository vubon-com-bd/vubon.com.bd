import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListWebhooksQuery } from './list-webhooks.query.js';
import {
  WEBHOOK_SERVICE,
  type IWebhookService,
} from '@application/services/interfaces/webhook.service.interface.js';
import type { WebhookListResponseDTO } from '@application/dtos/responses/webhook-response.dto.js';

@QueryHandler(ListWebhooksQuery)
export class ListWebhooksHandler
  implements IQueryHandler<ListWebhooksQuery, WebhookListResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(q: ListWebhooksQuery): Promise<WebhookListResponseDTO> {
    return this.service.list(q.options);
  }
}
