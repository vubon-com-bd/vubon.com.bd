/**
 * GenerateInvoiceHandler
 * @module payment-service/application/commands/invoice
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GenerateInvoiceCommand } from './generate-invoice.command.js';
import {
  INVOICE_SERVICE,
  type IInvoiceService,
} from '@application/services/interfaces/invoice.service.interface.js';
import type { InvoiceResponseDTO } from '@application/dtos/responses/invoice-response.dto.js';

@CommandHandler(GenerateInvoiceCommand)
export class GenerateInvoiceHandler
  implements ICommandHandler<GenerateInvoiceCommand, InvoiceResponseDTO>
{
  constructor(
    @Inject(INVOICE_SERVICE)
    private readonly service: IInvoiceService,
  ) {}
  async execute(c: GenerateInvoiceCommand): Promise<InvoiceResponseDTO> {
    return this.service.generate(c.dto, c.actorId);
  }
}
