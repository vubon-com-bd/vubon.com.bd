import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateWebhookCommand } from './activate-webhook.command.js';
import { WEBHOOK_SERVICE, type IWebhookService } from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@CommandHandler(ActivateWebhookCommand)
export class ActivateWebhookHandler
  implements ICommandHandler<ActivateWebhookCommand, WebhookResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: ActivateWebhookCommand): Promise<WebhookResponseDTO> {
    return this.service.activate(c.dto, c.actorId);
  }
}
