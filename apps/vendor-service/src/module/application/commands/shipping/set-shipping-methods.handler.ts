import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SetShippingMethodsCommand } from './set-shipping-methods.command';
import type { VendorShippingRepository } from '../../../domain/repositories/vendor-shipping.repository.interface';
import { VendorIdVO } from '../../../domain/value-objects/primitives/vendor-id.vo';
import { ShippingMethodVO } from '../../../domain/value-objects/primitives/shipping-method.vo';
import { VendorNotFoundAppError } from '../../errors/vendor.errors';

@CommandHandler(SetShippingMethodsCommand)
export class SetShippingMethodsHandler
  extends BaseCommandHandler<SetShippingMethodsCommand, void>
  implements ICommandHandler<SetShippingMethodsCommand>
{
  readonly commandType = 'vendor.shipping.set-methods';

  constructor(
    private readonly shippingRepo: VendorShippingRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SetShippingMethodsCommand): Promise<void> {
    const vendorId = VendorIdVO.create(command.vendorId);
    const shipping = await this.shippingRepo.findByVendorId(vendorId);
    if (!shipping) throw new VendorNotFoundAppError(command.vendorId);

    const updated = shipping.updateMethods(
      command.methods.map((m) => ShippingMethodVO.create(m)),
    );
    await this.shippingRepo.save(updated);
    void this.eventBus;
  }
}
