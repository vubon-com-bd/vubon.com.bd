import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandlePaperflyWebhookCommand } from './handle-paperfly-webhook.command.js';

/**
 * Paperfly webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandlePaperflyWebhookCommand)
export class HandlePaperflyWebhookHandler
  implements ICommandHandler<HandlePaperflyWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandlePaperflyWebhookHandler.name);

  async execute(c: HandlePaperflyWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Paperfly webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Paperfly] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
