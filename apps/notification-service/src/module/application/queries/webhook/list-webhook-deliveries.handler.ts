import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListWebhookDeliveriesQuery } from './list-webhook-deliveries.query.js';
import { WEBHOOK_SERVICE, type IWebhookService } from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookDeliveryListResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@QueryHandler(ListWebhookDeliveriesQuery)
export class ListWebhookDeliveriesHandler
  implements IQueryHandler<ListWebhookDeliveriesQuery, WebhookDeliveryListResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(q: ListWebhookDeliveriesQuery): Promise<WebhookDeliveryListResponseDTO> {
    return this.service.listDeliveries(q.options);
  }
}
