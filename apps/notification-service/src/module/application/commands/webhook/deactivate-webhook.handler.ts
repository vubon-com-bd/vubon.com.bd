import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateWebhookCommand } from './deactivate-webhook.command.js';
import { WEBHOOK_SERVICE, type IWebhookService } from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@CommandHandler(DeactivateWebhookCommand)
export class DeactivateWebhookHandler
  implements ICommandHandler<DeactivateWebhookCommand, WebhookResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: DeactivateWebhookCommand): Promise<WebhookResponseDTO> {
    return this.service.deactivate(c.dto, c.actorId);
  }
}
