import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UploadDocumentCommand } from './upload-document.command';
import type { VendorDocumentRepository } from '../../../domain/repositories/vendor-document.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UploadDocumentCommand)
export class UploadDocumentHandler
  extends BaseCommandHandler<UploadDocumentCommand, void>
  implements ICommandHandler<UploadDocumentCommand>
{
  readonly commandType = 'vendor.verification.upload-document';

  constructor(
    private readonly documentRepo: VendorDocumentRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UploadDocumentCommand): Promise<void> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const docs = await this.documentRepo.findByVendorId(vendorId);
    void docs;
    void command.documentType;
    void command.url;
    void command.number;
    void command.expiresAt;
    void this.eventBus;
    throw new Error('upload-document orchestration not yet wired');
  }
}
