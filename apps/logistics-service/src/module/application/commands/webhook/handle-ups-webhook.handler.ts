import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleUpsWebhookCommand } from './handle-ups-webhook.command.js';

/**
 * Ups webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleUpsWebhookCommand)
export class HandleUpsWebhookHandler
  implements ICommandHandler<HandleUpsWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleUpsWebhookHandler.name);

  async execute(c: HandleUpsWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Ups webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Ups] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
