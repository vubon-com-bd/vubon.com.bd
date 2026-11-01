import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetWebhookQuery } from './get-webhook.query.js';
import {
  WEBHOOK_SERVICE,
  type IWebhookService,
} from '@application/services/interfaces/webhook.service.interface.js';
import type { WebhookResponseDTO } from '@application/dtos/responses/webhook-response.dto.js';

@QueryHandler(GetWebhookQuery)
export class GetWebhookHandler
  implements IQueryHandler<GetWebhookQuery, WebhookResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(q: GetWebhookQuery): Promise<WebhookResponseDTO> {
    return this.service.getById(q.webhookId);
  }
}
