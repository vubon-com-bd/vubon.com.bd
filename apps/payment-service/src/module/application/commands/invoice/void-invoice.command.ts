/**
 * VoidInvoiceCommand
 * @module payment-service/application/commands/invoice
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { VoidInvoiceRequestDTO } from '@application/dtos/requests/invoice/index.js';

export class VoidInvoiceCommand extends BaseCommand {
  readonly type = 'payment.invoice.void';
  constructor(
    public readonly dto: VoidInvoiceRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
