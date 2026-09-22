import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SelectAddressCommand } from './select-address.command';
import type { CheckoutServiceInterface } from '../../services/interfaces/checkout.service.interface';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

@CommandHandler(SelectAddressCommand)
export class SelectAddressHandler
  extends BaseCommandHandler<SelectAddressCommand, CheckoutResponseDTO>
  implements ICommandHandler<SelectAddressCommand>
{
  readonly commandType = 'checkout.address.select';

  constructor(
    private readonly checkoutService: CheckoutServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SelectAddressCommand): Promise<CheckoutResponseDTO> {
    return this.checkoutService.selectAddress(command.checkoutId, command.addressId);
  }
}
