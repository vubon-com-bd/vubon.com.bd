import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TestWebhookCommand } from './test-webhook.command.js';
import {
  WEBHOOK_SERVICE,
  type IWebhookService,
} from '@application/services/interfaces/webhook.service.interface.js';
import type { WebhookDeliveryResponseDTO } from '@application/dtos/responses/webhook-response.dto.js';

@CommandHandler(TestWebhookCommand)
export class TestWebhookHandler
  implements ICommandHandler<TestWebhookCommand, WebhookDeliveryResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: TestWebhookCommand): Promise<WebhookDeliveryResponseDTO> {
    return this.service.test(c.dto, c.actorId);
  }
}
