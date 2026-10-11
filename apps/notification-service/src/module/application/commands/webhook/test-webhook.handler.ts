import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TestWebhookCommand } from './test-webhook.command.js';
import { WEBHOOK_SERVICE, type IWebhookService } from '../../services/interfaces/webhook.service.interface.js';
import type { WebhookTestResponseDTO } from '../../dtos/responses/webhook-response.dto.js';

@CommandHandler(TestWebhookCommand)
export class TestWebhookHandler
  implements ICommandHandler<TestWebhookCommand, WebhookTestResponseDTO>
{
  constructor(@Inject(WEBHOOK_SERVICE) private readonly service: IWebhookService) {}

  async execute(c: TestWebhookCommand): Promise<WebhookTestResponseDTO> {
    return this.service.test(c.dto, c.actorId);
  }
}
