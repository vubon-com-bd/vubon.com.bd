import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UploadDocumentCommand extends BaseCommand {
  readonly type = 'vendor.verification.upload-document';

  constructor(
    public readonly vendorId: string,
    public readonly documentType: string,
    public readonly url: string,
    public readonly number?: string,
    public readonly expiresAt?: string,
  ) {
    super();
  }
}
