/**
 * VoidInvoiceHandler
 * @module payment-service/application/commands/invoice
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VoidInvoiceCommand } from './void-invoice.command.js';
import {
  INVOICE_SERVICE,
  type IInvoiceService,
} from '@application/services/interfaces/invoice.service.interface.js';
import type { InvoiceResponseDTO } from '@application/dtos/responses/invoice-response.dto.js';

@CommandHandler(VoidInvoiceCommand)
export class VoidInvoiceHandler
  implements ICommandHandler<VoidInvoiceCommand, InvoiceResponseDTO>
{
  constructor(
    @Inject(INVOICE_SERVICE)
    private readonly service: IInvoiceService,
  ) {}
  async execute(c: VoidInvoiceCommand): Promise<InvoiceResponseDTO> {
    return this.service.void(c.dto, c.actorId);
  }
}
