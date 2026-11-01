import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleSundarbanWebhookCommand } from './handle-sundarban-webhook.command.js';

/**
 * Sundarban webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleSundarbanWebhookCommand)
export class HandleSundarbanWebhookHandler
  implements ICommandHandler<HandleSundarbanWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleSundarbanWebhookHandler.name);

  async execute(c: HandleSundarbanWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Sundarban webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Sundarban] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
