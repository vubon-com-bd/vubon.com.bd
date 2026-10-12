import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListVendorDocumentsQuery } from './list-vendor-documents.query.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { VendorDocumentResponseDto } from '../../dtos/responses/vendor-document-response.dto.js';

@QueryHandler(ListVendorDocumentsQuery)
export class ListVendorDocumentsHandler
  implements IQueryHandler<ListVendorDocumentsQuery, readonly VendorDocumentResponseDto[]>
{
  constructor(@Inject(VENDOR_DOCUMENT_SERVICE) private readonly service: IVendorDocumentService) {}
  async execute(query: ListVendorDocumentsQuery): Promise<readonly VendorDocumentResponseDto[]> {
    return this.service.listByVendor(query.vendorId);
  }
}
