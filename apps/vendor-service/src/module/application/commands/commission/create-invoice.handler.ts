/**
 * CreateInvoiceHandler
 * @module vendor-service/application/commands/commission
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateInvoiceCommand } from './create-invoice.command.js';
import {
  VENDOR_INVOICE_SERVICE,
  type IVendorInvoiceService,
} from '../../services/interfaces/vendor-invoice.service.interface.js';
import type { VendorInvoiceResponseDto } from '../../dtos/responses/vendor-invoice-response.dto.js';

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceHandler
  implements ICommandHandler<CreateInvoiceCommand, VendorInvoiceResponseDto>
{
  constructor(@Inject(VENDOR_INVOICE_SERVICE) private readonly service: IVendorInvoiceService) {}
  async execute(cmd: CreateInvoiceCommand): Promise<VendorInvoiceResponseDto> {
    return this.service.create(cmd.dto, cmd.actorId);
  }
}
