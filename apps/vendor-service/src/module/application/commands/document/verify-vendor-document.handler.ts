/**
 * VerifyVendorDocumentHandler
 * @module vendor-service/application/commands/document
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { VerifyVendorDocumentCommand } from './verify-vendor-document.command.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { VendorDocumentResponseDto } from '../../dtos/responses/vendor-document-response.dto.js';

@CommandHandler(VerifyVendorDocumentCommand)
export class VerifyVendorDocumentHandler
  implements ICommandHandler<VerifyVendorDocumentCommand, VendorDocumentResponseDto>
{
  constructor(
    @Inject(VENDOR_DOCUMENT_SERVICE) private readonly service: IVendorDocumentService,
  ) {}

  async execute(cmd: VerifyVendorDocumentCommand): Promise<VendorDocumentResponseDto> {
    return this.service.verify(cmd.documentId, cmd.verifiedBy, cmd.actorId);
  }
}
