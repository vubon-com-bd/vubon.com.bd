import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandlePathaoWebhookCommand } from './handle-pathao-webhook.command.js';

/**
 * Pathao webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandlePathaoWebhookCommand)
export class HandlePathaoWebhookHandler
  implements ICommandHandler<HandlePathaoWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandlePathaoWebhookHandler.name);

  async execute(c: HandlePathaoWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('Pathao webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[Pathao] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
