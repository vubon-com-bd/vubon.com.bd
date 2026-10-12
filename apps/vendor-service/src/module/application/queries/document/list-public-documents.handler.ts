import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPublicDocumentsQuery } from './list-public-documents.query.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { VendorDocumentPublicDto } from '../../dtos/responses/vendor-document-response.dto.js';

@QueryHandler(ListPublicDocumentsQuery)
export class ListPublicDocumentsHandler
  implements IQueryHandler<ListPublicDocumentsQuery, readonly VendorDocumentPublicDto[]>
{
  constructor(@Inject(VENDOR_DOCUMENT_SERVICE) private readonly service: IVendorDocumentService) {}
  async execute(query: ListPublicDocumentsQuery): Promise<readonly VendorDocumentPublicDto[]> {
    return this.service.listPublicByVendor(query.vendorId);
  }
}
