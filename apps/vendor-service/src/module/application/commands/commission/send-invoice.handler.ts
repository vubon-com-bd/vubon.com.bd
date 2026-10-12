/**
 * SendInvoiceHandler
 * @module vendor-service/application/commands/commission
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendInvoiceCommand } from './send-invoice.command.js';
import {
  VENDOR_INVOICE_SERVICE,
  type IVendorInvoiceService,
} from '../../services/interfaces/vendor-invoice.service.interface.js';
import type { VendorInvoiceResponseDto } from '../../dtos/responses/vendor-invoice-response.dto.js';

@CommandHandler(SendInvoiceCommand)
export class SendInvoiceHandler
  implements ICommandHandler<SendInvoiceCommand, VendorInvoiceResponseDto>
{
  constructor(@Inject(VENDOR_INVOICE_SERVICE) private readonly service: IVendorInvoiceService) {}
  async execute(cmd: SendInvoiceCommand): Promise<VendorInvoiceResponseDto> {
    return this.service.send(cmd.dto, cmd.actorId);
  }
}
