import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateWarrantyCommand } from './update-warranty.command';
import type { VendorWarrantyRepository } from '../../../domain/repositories/vendor-warranty.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { WarrantyTypeVO } from '../../../domain/value-objects/primitives/warranty-type.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateWarrantyCommand)
export class UpdateWarrantyHandler
  extends BaseCommandHandler<UpdateWarrantyCommand, void>
  implements ICommandHandler<UpdateWarrantyCommand>
{
  readonly commandType = 'vendor.warranty.update';

  constructor(
    private readonly warrantyRepo: VendorWarrantyRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateWarrantyCommand): Promise<void> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const warranty = await this.warrantyRepo.findByVendorId(vendorId);
    if (!warranty) throw new VendorNotFoundAppError(command.vendorId);

    const updated = warranty.update(
      WarrantyTypeVO.create(command.warrantyType),
      command.durationDays,
      command.terms ?? null,
    );
    await this.warrantyRepo.save(updated);
    void this.eventBus;
  }
}
