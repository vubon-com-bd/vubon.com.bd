import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetWebhookQuery } from './get-webhook.query.js';
import {
  WEBHOOK_SERVICE,
  type IWebhookService,
} from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookEventResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@QueryHandler(GetWebhookQuery)
export class GetWebhookHandler
  implements IQueryHandler<GetWebhookQuery, WebhookEventResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(q: GetWebhookQuery): Promise<WebhookEventResponseDTO> {
    return this.service.getById(q.webhookId);
  }
}
