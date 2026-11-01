import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { HandleSaParibahanWebhookCommand } from './handle-sa-paribahan-webhook.command.js';

/**
 * SaParibahan webhook handler — log-only stub
 * Real tracking update logic lives in Interfaces controller.
 */
@CommandHandler(HandleSaParibahanWebhookCommand)
export class HandleSaParibahanWebhookHandler
  implements ICommandHandler<HandleSaParibahanWebhookCommand, { success: boolean }>
{
  private readonly logger = new Logger(HandleSaParibahanWebhookHandler.name);

  async execute(c: HandleSaParibahanWebhookCommand): Promise<{ success: boolean }> {
    const p = c.dto.body;
    if (!p?.trackingNumber) {
      this.logger.warn('SaParibahan webhook: missing trackingNumber');
      return { success: false };
    }
    this.logger.log(
      `[SaParibahan] trackingNumber=${p.trackingNumber}, status=${p.status}, at=${p.occurredAt}`,
    );
    return { success: true };
  }
}
