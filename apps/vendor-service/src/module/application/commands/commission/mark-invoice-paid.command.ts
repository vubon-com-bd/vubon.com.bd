/**
 * MarkInvoicePaidCommand
 * @module vendor-service/application/commands/commission
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MarkInvoicePaidRequestDto } from '../../dtos/requests/mark-invoice-paid.dto.js';

export class MarkInvoicePaidCommand extends BaseCommand {
  readonly type = 'vendor.invoice.mark_paid';
  constructor(
    public readonly dto: MarkInvoicePaidRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}
