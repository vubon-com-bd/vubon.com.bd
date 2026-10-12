import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInvoicesByVendorQuery } from './list-invoices-by-vendor.query.js';
import {
  VENDOR_INVOICE_SERVICE,
  type IVendorInvoiceService,
} from '../../services/interfaces/vendor-invoice.service.interface.js';
import type { VendorInvoiceResponseDto } from '../../dtos/responses/vendor-invoice-response.dto.js';

@QueryHandler(ListInvoicesByVendorQuery)
export class ListInvoicesByVendorHandler
  implements IQueryHandler<ListInvoicesByVendorQuery, readonly VendorInvoiceResponseDto[]>
{
  constructor(@Inject(VENDOR_INVOICE_SERVICE) private readonly service: IVendorInvoiceService) {}
  async execute(query: ListInvoicesByVendorQuery): Promise<readonly VendorInvoiceResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
