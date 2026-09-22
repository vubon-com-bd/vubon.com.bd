import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateShippingCommand } from './update-shipping.command';
import type { VendorShippingRepository } from '../../../domain/repositories/vendor-shipping.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(UpdateShippingCommand)
export class UpdateShippingHandler
  extends BaseCommandHandler<UpdateShippingCommand, void>
  implements ICommandHandler<UpdateShippingCommand>
{
  readonly commandType = 'vendor.shipping.update';

  constructor(
    private readonly shippingRepo: VendorShippingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateShippingCommand): Promise<void> {
    const shipping = await this.shippingRepo.findByVendorId(
      VendorIdVO.create(command.vendorId),
    );
    if (!shipping) throw new VendorNotFoundAppError(command.vendorId);
    void this.eventBus;
    throw new Error('update-shipping orchestration not yet wired');
  }
}
