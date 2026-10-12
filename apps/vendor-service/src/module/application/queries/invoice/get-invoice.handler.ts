import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInvoiceQuery } from './get-invoice.query.js';
import {
  VENDOR_INVOICE_SERVICE,
  type IVendorInvoiceService,
} from '../../services/interfaces/vendor-invoice.service.interface.js';
import type { VendorInvoiceResponseDto } from '../../dtos/responses/vendor-invoice-response.dto.js';

@QueryHandler(GetInvoiceQuery)
export class GetInvoiceHandler
  implements IQueryHandler<GetInvoiceQuery, VendorInvoiceResponseDto>
{
  constructor(@Inject(VENDOR_INVOICE_SERVICE) private readonly service: IVendorInvoiceService) {}
  async execute(query: GetInvoiceQuery): Promise<VendorInvoiceResponseDto> {
    return this.service.getById(query.invoiceId);
  }
}
