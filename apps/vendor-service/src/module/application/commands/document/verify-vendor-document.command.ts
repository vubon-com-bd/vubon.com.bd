/**
 * VerifyVendorDocumentCommand
 * @module vendor-service/application/commands/document
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class VerifyVendorDocumentCommand extends BaseCommand {
  readonly type = 'vendor.document.verify';
  constructor(
    public readonly documentId: string,
    public readonly verifiedBy: string,
    public readonly actorId?: string,
  ) {
    super();
  }
}
