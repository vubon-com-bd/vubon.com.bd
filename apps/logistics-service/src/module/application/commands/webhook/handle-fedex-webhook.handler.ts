import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleFedexWebhookCommand } from './handle-fedex-webhook.command.js';

/**
 * Fedex webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleFedexWebhookCommand)
export class HandleFedexWebhookHandler
  implements ICommandHandler<HandleFedexWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleFedexWebhookHandler.name);

  async execute(c: HandleFedexWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Fedex webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Fedex] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
