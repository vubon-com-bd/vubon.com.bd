import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateVendorCommand } from './update-vendor.command';
import type { VendorRepository } from '../../../domain/repositories/vendor.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto';

@CommandHandler(UpdateVendorCommand)
export class UpdateVendorHandler
  extends BaseCommandHandler<UpdateVendorCommand, VendorResponseDto>
  implements ICommandHandler<UpdateVendorCommand>
{
  readonly commandType = 'vendor.update';

  constructor(
    private readonly vendorRepo: VendorRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateVendorCommand): Promise<VendorResponseDto> {
    const vendor = await this.vendorRepo.findById(
      VendorIdVO.create(command.vendorId),
    );
    if (!vendor) {
      throw new VendorNotFoundAppError(command.vendorId);
    }

    const events = vendor.pullDomainEvents();
    for (const event of events) {
      this.eventBus.publish(event as never);
    }

    return {
      id: vendor.id.value,
      ownerId: vendor.ownerId.value,
      name: vendor.name.value,
      slug: vendor.slug.value,
      status: vendor.status.value,
      type: vendor.type.value,
      tier: vendor.tier.value,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    };
  }
}
