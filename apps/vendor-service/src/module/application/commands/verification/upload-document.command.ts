import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UploadDocumentRequestDTO } from '../../dtos/requests/verification/index.js';

export class UploadDocumentCommand extends BaseCommand {
  readonly type = 'vendor.document.upload';
  constructor(
    public readonly dto: UploadDocumentRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}
