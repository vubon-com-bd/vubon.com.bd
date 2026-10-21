/**
 * GetInvoiceHandler
 * @module payment-service/application/queries/invoice
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInvoiceQuery } from './get-invoice.query.js';
import {
  INVOICE_SERVICE,
  type IInvoiceService,
} from '@application/services/interfaces/invoice.service.interface.js';
import type { InvoiceResponseDTO } from '@application/dtos/responses/invoice-response.dto.js';

@QueryHandler(GetInvoiceQuery)
export class GetInvoiceHandler
  implements IQueryHandler<GetInvoiceQuery, InvoiceResponseDTO>
{
  constructor(
    @Inject(INVOICE_SERVICE)
    private readonly service: IInvoiceService,
  ) {}
  async execute(q: GetInvoiceQuery): Promise<InvoiceResponseDTO> {
    return this.service.getById(q.invoiceId);
  }
}
