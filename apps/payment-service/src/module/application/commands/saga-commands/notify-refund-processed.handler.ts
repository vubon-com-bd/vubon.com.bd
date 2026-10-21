/**
 * NotifyRefundProcessedHandler — stub (cross-service notification)
 * @module payment-service/application/commands/saga-commands
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { NotifyRefundProcessedCommand } from '@application/sagas/commands/notify-refund-processed.command';

@CommandHandler(NotifyRefundProcessedCommand)
export class NotifyRefundProcessedHandler
  implements ICommandHandler<NotifyRefundProcessedCommand, void>
{
  private readonly logger = new Logger(NotifyRefundProcessedHandler.name);

  async execute(c: NotifyRefundProcessedCommand): Promise<void> {
    this.logger.debug(
      `[refund-notify-stub] refund=${c.refundId} amount=${c.amount} ${c.currency}`,
    );
  }
}
