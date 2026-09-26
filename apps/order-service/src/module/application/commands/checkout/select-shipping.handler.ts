import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SelectShippingCommand } from './select-shipping.command';
import type { CheckoutServiceInterface } from '../../services/interfaces/checkout.service.interface';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

@CommandHandler(SelectShippingCommand)
export class SelectShippingHandler
  extends BaseCommandHandler<SelectShippingCommand, CheckoutResponseDTO>
  implements ICommandHandler<SelectShippingCommand>
{
  readonly commandType = 'checkout.shipping.select';

  constructor(
    private readonly checkoutService: CheckoutServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SelectShippingCommand): Promise<CheckoutResponseDTO> {
    return this.checkoutService.selectShipping(command.checkoutId, command.methodId);
  }
}
