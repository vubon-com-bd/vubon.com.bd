import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeleteVendorCommand } from './delete-vendor.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(DeleteVendorCommand)
export class DeleteVendorHandler
  extends BaseCommandHandler<DeleteVendorCommand, void>
  implements ICommandHandler<DeleteVendorCommand>
{
  readonly commandType = 'vendor.delete';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeleteVendorCommand): Promise<void> {
    const vendor = await this.vendorRepo.findById(
      VendorIdVO.create(command.vendorId),
    );
    if (!vendor) {
      throw new VendorNotFoundAppError(command.vendorId);
    }
    await this.vendorRepo.delete(VendorIdVO.create(command.vendorId));
  }
}
