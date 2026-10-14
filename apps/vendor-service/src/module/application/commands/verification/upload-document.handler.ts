import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadDocumentCommand } from './upload-document.command.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { DocumentResponseDTO } from '../../dtos/responses/verification-response.dto.js';

@CommandHandler(UploadDocumentCommand)
export class UploadDocumentHandler
  implements ICommandHandler<UploadDocumentCommand, DocumentResponseDTO>
{
  constructor(
    @Inject(VENDOR_DOCUMENT_SERVICE)
    private readonly service: IVendorDocumentService,
  ) {}

  async execute(c: UploadDocumentCommand): Promise<DocumentResponseDTO> {
    return this.service.upload(c.dto, c.actorId);
  }
}
