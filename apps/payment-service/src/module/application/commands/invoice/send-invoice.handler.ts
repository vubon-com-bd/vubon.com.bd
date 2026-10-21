/**
 * SendInvoiceHandler
 * @module payment-service/application/commands/invoice
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SendInvoiceCommand } from './send-invoice.command.js';
import {
  INVOICE_SERVICE,
  type IInvoiceService,
} from '@application/services/interfaces/invoice.service.interface.js';
import type { InvoiceResponseDTO } from '@application/dtos/responses/invoice-response.dto.js';

@CommandHandler(SendInvoiceCommand)
export class SendInvoiceHandler
  implements ICommandHandler<SendInvoiceCommand, InvoiceResponseDTO>
{
  constructor(
    @Inject(INVOICE_SERVICE)
    private readonly service: IInvoiceService,
  ) {}
  async execute(c: SendInvoiceCommand): Promise<InvoiceResponseDTO> {
    return this.service.send(c.dto, c.actorId);
  }
}
