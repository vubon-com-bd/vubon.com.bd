import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RequestInfoCommand } from './request-info.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import type { VendorApprovalRepository } from '../../../domain/repositories/vendor-approval.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(RequestInfoCommand)
export class RequestInfoHandler
  extends BaseCommandHandler<RequestInfoCommand, void>
  implements ICommandHandler<RequestInfoCommand>
{
  readonly commandType = 'vendor.approval.request-info';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly approvalRepo: VendorApprovalRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RequestInfoCommand): Promise<void> {
    const vendor = await this.vendorRepo.findById(
      VendorIdVO.create(command.vendorId),
    );
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);
    void this.approvalRepo;
    void this.eventBus;
    throw new Error('request-info orchestration not yet wired');
  }
}
