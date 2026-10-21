/**
 * ListInvoicesHandler
 * @module payment-service/application/queries/invoice
 */
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInvoicesQuery } from './list-invoices.query.js';
import {
  INVOICE_SERVICE,
  type IInvoiceService,
} from '@application/services/interfaces/invoice.service.interface.js';
import type { InvoiceListResponseDTO } from '@application/dtos/responses/invoice-response.dto.js';

@QueryHandler(ListInvoicesQuery)
export class ListInvoicesHandler
  implements IQueryHandler<ListInvoicesQuery, InvoiceListResponseDTO>
{
  constructor(
    @Inject(INVOICE_SERVICE)
    private readonly service: IInvoiceService,
  ) {}
  async execute(q: ListInvoicesQuery): Promise<InvoiceListResponseDTO> {
    return this.service.list({
      page: q.page,
      limit: q.limit,
      filter: q.filter,
      sortBy: q.sortBy,
      sortDir: q.sortDir,
    });
  }
}
