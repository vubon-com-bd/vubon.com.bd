/**
 * NotifyPaymentSuccessHandler — stub (cross-service notification)
 * @module payment-service/application/commands/saga-commands
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { NotifyPaymentSuccessCommand } from '@application/sagas/commands/notify-payment-success.command';

@CommandHandler(NotifyPaymentSuccessCommand)
export class NotifyPaymentSuccessHandler
  implements ICommandHandler<NotifyPaymentSuccessCommand, void>
{
  private readonly logger = new Logger(NotifyPaymentSuccessHandler.name);

  async execute(c: NotifyPaymentSuccessCommand): Promise<void> {
    this.logger.debug(
      `[notify-stub] payment=${c.paymentId} amount=${c.amount} ${c.currency} → notification-service`,
    );
  }
}
