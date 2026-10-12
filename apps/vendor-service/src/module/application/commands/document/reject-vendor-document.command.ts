/**
 * RejectVendorDocumentCommand
 * @module vendor-service/application/commands/document
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RejectVendorDocumentCommand extends BaseCommand {
  readonly type = 'vendor.document.reject';
  constructor(
    public readonly documentId: string,
    public readonly reason: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
