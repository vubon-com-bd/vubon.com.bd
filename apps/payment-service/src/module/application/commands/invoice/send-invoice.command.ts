/**
 * SendInvoiceCommand
 * @module payment-service/application/commands/invoice
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendInvoiceRequestDTO } from '@application/dtos/requests/invoice/index.js';

export class SendInvoiceCommand extends BaseCommand {
  readonly type = 'payment.invoice.send';
  constructor(
    public readonly dto: SendInvoiceRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
