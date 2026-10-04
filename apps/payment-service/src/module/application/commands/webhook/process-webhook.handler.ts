import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ProcessWebhookCommand } from './process-webhook.command.js';
import {
  WEBHOOK_SERVICE,
  type IWebhookService,
} from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookProcessResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@CommandHandler(ProcessWebhookCommand)
export class ProcessWebhookHandler
  implements ICommandHandler<ProcessWebhookCommand, WebhookProcessResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: ProcessWebhookCommand): Promise<WebhookProcessResponseDTO> {
    return this.service.process(c.dto);
  }
}
