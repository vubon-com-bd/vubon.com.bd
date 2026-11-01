import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleDhlWebhookCommand } from './handle-dhl-webhook.command.js';

/**
 * Dhl webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleDhlWebhookCommand)
export class HandleDhlWebhookHandler
  implements ICommandHandler<HandleDhlWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleDhlWebhookHandler.name);

  async execute(c: HandleDhlWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Dhl webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Dhl] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
