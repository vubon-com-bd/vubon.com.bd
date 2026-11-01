import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateWebhookCommand } from './create-webhook.command.js';
import {
  WEBHOOK_SERVICE,
  type IWebhookService,
} from '@application/services/interfaces/webhook.service.interface.js';
import type { WebhookResponseDTO } from '@application/dtos/responses/webhook-response.dto.js';

@CommandHandler(CreateWebhookCommand)
export class CreateWebhookHandler
  implements ICommandHandler<CreateWebhookCommand, WebhookResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: CreateWebhookCommand): Promise<WebhookResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
