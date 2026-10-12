/**
 * MarkInvoicePaidHandler
 * @module vendor-service/application/commands/commission
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkInvoicePaidCommand } from './mark-invoice-paid.command.js';
import {
  VENDOR_INVOICE_SERVICE,
  type IVendorInvoiceService,
} from '../../services/interfaces/vendor-invoice.service.interface.js';
import type { VendorInvoiceResponseDto } from '../../dtos/responses/vendor-invoice-response.dto.js';

@CommandHandler(MarkInvoicePaidCommand)
export class MarkInvoicePaidHandler
  implements ICommandHandler<MarkInvoicePaidCommand, VendorInvoiceResponseDto>
{
  constructor(@Inject(VENDOR_INVOICE_SERVICE) private readonly service: IVendorInvoiceService) {}
  async execute(cmd: MarkInvoicePaidCommand): Promise<VendorInvoiceResponseDto> {
    return this.service.markPaid(cmd.dto, cmd.actorId);
  }
}
