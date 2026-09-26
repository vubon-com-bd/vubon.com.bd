import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateBusinessCommand } from './update-business.command';
import type { VendorBusinessRepository } from '../../../domain/repositories/vendor-business.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateBusinessCommand)
export class UpdateBusinessHandler
  extends BaseCommandHandler<UpdateBusinessCommand, void>
  implements ICommandHandler<UpdateBusinessCommand>
{
  readonly commandType = 'vendor.update-business';

  constructor(
    private readonly businessRepo: VendorBusinessRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateBusinessCommand): Promise<void> {
    const business = await this.businessRepo.findByVendorId(
      VendorIdVO.create(command.vendorId),
    );
    if (!business) {
      throw new VendorNotFoundAppError(command.vendorId);
    }
    await this.businessRepo.save(business);
  }
}
