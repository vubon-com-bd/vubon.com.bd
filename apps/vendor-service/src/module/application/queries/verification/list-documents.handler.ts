import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListDocumentsQuery } from './list-documents.query.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { DocumentListResponseDTO } from '../../dtos/responses/verification-response.dto.js';

@QueryHandler(ListDocumentsQuery)
export class ListDocumentsHandler
  implements IQueryHandler<ListDocumentsQuery, DocumentListResponseDTO>
{
  constructor(
    @Inject(VENDOR_DOCUMENT_SERVICE)
    private readonly service: IVendorDocumentService,
  ) {}

  async execute(q: ListDocumentsQuery): Promise<DocumentListResponseDTO> {
    return this.service.listByVendor(q.vendorId);
  }
}
