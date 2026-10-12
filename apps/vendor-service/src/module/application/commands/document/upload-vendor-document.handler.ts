/**
 * UploadVendorDocumentHandler
 * @module vendor-service/application/commands/document
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UploadVendorDocumentCommand } from './upload-vendor-document.command.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { VendorDocumentResponseDto } from '../../dtos/responses/vendor-document-response.dto.js';

@CommandHandler(UploadVendorDocumentCommand)
export class UploadVendorDocumentHandler
  implements ICommandHandler<UploadVendorDocumentCommand, VendorDocumentResponseDto>
{
  constructor(
    @Inject(VENDOR_DOCUMENT_SERVICE) private readonly service: IVendorDocumentService,
  ) {}

  async execute(cmd: UploadVendorDocumentCommand): Promise<VendorDocumentResponseDto> {
    return this.service.upload(cmd.dto, cmd.actorId);
  }
}
