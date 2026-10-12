import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetVendorDocumentQuery } from './get-vendor-document.query.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { VendorDocumentResponseDto } from '../../dtos/responses/vendor-document-response.dto.js';

@QueryHandler(GetVendorDocumentQuery)
export class GetVendorDocumentHandler
  implements IQueryHandler<GetVendorDocumentQuery, VendorDocumentResponseDto>
{
  constructor(@Inject(VENDOR_DOCUMENT_SERVICE) private readonly service: IVendorDocumentService) {}
  async execute(query: GetVendorDocumentQuery): Promise<VendorDocumentResponseDto> {
    return this.service.getById(query.documentId);
  }
}
