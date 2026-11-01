import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleRedxWebhookCommand } from './handle-redx-webhook.command.js';

/**
 * Redx webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleRedxWebhookCommand)
export class HandleRedxWebhookHandler
  implements ICommandHandler<HandleRedxWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleRedxWebhookHandler.name);

  async execute(c: HandleRedxWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Redx webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Redx] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
