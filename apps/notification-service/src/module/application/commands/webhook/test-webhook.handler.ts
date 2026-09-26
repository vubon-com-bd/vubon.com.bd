import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TestWebhookCommand } from './test-webhook.command';
import type { WebhookRepository } from '../../../domain/repositories/webhook.repository.interface';
import { WebhookIdVO } from '../../../domain/value-objects/primitives/webhook-id.vo';
import { HttpWebhookProvider } from '../../../infrastructure/providers/webhook/http.provider';

@CommandHandler(TestWebhookCommand)
export class TestWebhookHandler
  extends BaseCommandHandler<TestWebhookCommand, { delivered: boolean }>
  implements ICommandHandler<TestWebhookCommand>
{
  readonly commandType = 'webhook.test';

  constructor(
    private readonly webhookRepo: WebhookRepository,
    private readonly httpProvider: HttpWebhookProvider,
  ) {
    super();
  }

  async execute(command: TestWebhookCommand): Promise<{ delivered: boolean }> {
    const entity = await this.webhookRepo.findById(WebhookIdVO.create(command.webhookId));
    if (!entity) throw new Error(`Webhook not found: ${command.webhookId}`);

    const result = await this.httpProvider.send({
      recipient: entity.url.value,
      subject: command.event,
      body: JSON.stringify(command.data ?? {}),
    });

    return { delivered: result.success };
  }
}
