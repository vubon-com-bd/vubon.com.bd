/**
 * SendInvoiceEmailCommand
 * @module payment-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendInvoiceEmailCommand extends BaseSagaCommand {
  readonly type = 'payment.saga.send_invoice_email';
  constructor(
    public readonly invoiceId: string,
    public readonly recipientEmail: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}
