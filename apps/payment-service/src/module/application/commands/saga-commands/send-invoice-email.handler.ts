/**
 * SendInvoiceEmailHandler — stub (cross-service email)
 * @module payment-service/application/commands/saga-commands
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { SendInvoiceEmailCommand } from '@application/sagas/commands/send-invoice-email.command';

@CommandHandler(SendInvoiceEmailCommand)
export class SendInvoiceEmailHandler
  implements ICommandHandler<SendInvoiceEmailCommand, void>
{
  private readonly logger = new Logger(SendInvoiceEmailHandler.name);

  async execute(c: SendInvoiceEmailCommand): Promise<void> {
    this.logger.debug(
      `[invoice-email-stub] invoice=${c.invoiceId} to=${c.recipientEmail}`,
    );
  }
}
