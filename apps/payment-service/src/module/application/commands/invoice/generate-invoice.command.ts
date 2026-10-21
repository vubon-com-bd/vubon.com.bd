/**
 * GenerateInvoiceCommand
 * @module payment-service/application/commands/invoice
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { GenerateInvoiceRequestDTO } from '@application/dtos/requests/invoice/index.js';

export class GenerateInvoiceCommand extends BaseCommand {
  readonly type = 'payment.invoice.generate';
  constructor(
    public readonly dto: GenerateInvoiceRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
