import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateProfileCommand } from './update-profile.command';
import type { VendorProfileRepository } from '../../../domain/repositories/vendor-profile.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  extends BaseCommandHandler<UpdateProfileCommand, void>
  implements ICommandHandler<UpdateProfileCommand>
{
  readonly commandType = 'vendor.update-profile';

  constructor(
    private readonly profileRepo: VendorProfileRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateProfileCommand): Promise<void> {
    const profile = await this.profileRepo.findByVendorId(
      VendorIdVO.create(command.vendorId),
    );
    if (!profile) {
      throw new VendorNotFoundAppError(command.vendorId);
    }
    await this.profileRepo.save(profile);
  }
}
