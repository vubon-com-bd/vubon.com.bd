import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleAramexWebhookCommand } from './handle-aramex-webhook.command.js';

/**
 * Aramex webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleAramexWebhookCommand)
export class HandleAramexWebhookHandler
  implements ICommandHandler<HandleAramexWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleAramexWebhookHandler.name);

  async execute(c: HandleAramexWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Aramex webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Aramex] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
