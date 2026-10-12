/**
 * RejectVendorDocumentHandler
 * @module vendor-service/application/commands/document
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RejectVendorDocumentCommand } from './reject-vendor-document.command.js';
import {
  VENDOR_DOCUMENT_SERVICE,
  type IVendorDocumentService,
} from '../../services/interfaces/vendor-document.service.interface.js';
import type { VendorDocumentResponseDto } from '../../dtos/responses/vendor-document-response.dto.js';

@CommandHandler(RejectVendorDocumentCommand)
export class RejectVendorDocumentHandler
  implements ICommandHandler<RejectVendorDocumentCommand, VendorDocumentResponseDto>
{
  constructor(
    @Inject(VENDOR_DOCUMENT_SERVICE) private readonly service: IVendorDocumentService,
  ) {}

  async execute(cmd: RejectVendorDocumentCommand): Promise<VendorDocumentResponseDto> {
    return this.service.reject(cmd.documentId, cmd.reason, cmd.actorId);
  }
}
