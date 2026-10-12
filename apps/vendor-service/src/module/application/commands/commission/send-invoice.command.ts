/**
 * SendInvoiceCommand
 * @module vendor-service/application/commands/commission
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SendInvoiceRequestDto } from '../../dtos/requests/send-invoice.dto.js';

export class SendInvoiceCommand extends BaseCommand {
  readonly type = 'vendor.invoice.send';
  constructor(
    public readonly dto: SendInvoiceRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
