import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DisableWebhookCommand } from './disable-webhook.command.js';
import { WEBHOOK_SERVICE, type IWebhookService } from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@CommandHandler(DisableWebhookCommand)
export class DisableWebhookHandler
  implements ICommandHandler<DisableWebhookCommand, WebhookResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: DisableWebhookCommand): Promise<WebhookResponseDTO> {
    return this.service.disable(c.dto, c.actorId);
  }
}
