/**
 * UploadVendorDocumentCommand
 * @module vendor-service/application/commands/document
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UploadVendorDocumentRequestDto } from '../../dtos/requests/upload-document.dto.js';

export class UploadVendorDocumentCommand extends BaseCommand {
  readonly type = 'vendor.document.upload';
  constructor(
    public readonly dto: UploadVendorDocumentRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}
