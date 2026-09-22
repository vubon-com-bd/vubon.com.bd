import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateCommissionCommand } from './update-commission.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateCommissionCommand)
export class UpdateCommissionHandler
  extends BaseCommandHandler<UpdateCommissionCommand, void>
  implements ICommandHandler<UpdateCommissionCommand>
{
  readonly commandType = 'vendor.commission.update';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateCommissionCommand): Promise<void> {
    const vendor = await this.vendorRepo.findById(
      VendorIdVO.create(command.vendorId),
    );
    if (!vendor) throw new VendorNotFoundAppError(command.vendorId);
    void command.rate;
    void command.commissionType;
    void this.eventBus;
    throw new Error('update-commission orchestration not yet wired');
  }
}
