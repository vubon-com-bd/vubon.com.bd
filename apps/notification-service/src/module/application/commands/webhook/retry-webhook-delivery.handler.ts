import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RetryWebhookDeliveryCommand } from './retry-webhook-delivery.command.js';
import { WEBHOOK_SERVICE, type IWebhookService } from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookDeliveryResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@CommandHandler(RetryWebhookDeliveryCommand)
export class RetryWebhookDeliveryHandler
  implements ICommandHandler<RetryWebhookDeliveryCommand, WebhookDeliveryResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: RetryWebhookDeliveryCommand): Promise<WebhookDeliveryResponseDTO> {
    return this.service.retryDelivery(c.dto, c.actorId);
  }
}
