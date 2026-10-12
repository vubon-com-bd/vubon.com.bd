/**
 * CreateInvoiceCommand
 * @module vendor-service/application/commands/commission
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateInvoiceRequestDto } from '../../dtos/requests/create-invoice.dto.js';

export class CreateInvoiceCommand extends BaseCommand {
  readonly type = 'vendor.invoice.create';
  constructor(
    public readonly dto: CreateInvoiceRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
