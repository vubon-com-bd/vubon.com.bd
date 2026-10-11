import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateWebhookCommand } from './update-webhook.command.js';
import { WEBHOOK_SERVICE, type IWebhookService } from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@CommandHandler(UpdateWebhookCommand)
export class UpdateWebhookHandler
  implements ICommandHandler<UpdateWebhookCommand, WebhookResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: UpdateWebhookCommand): Promise<WebhookResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
