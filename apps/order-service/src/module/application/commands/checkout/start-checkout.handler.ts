import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartCheckoutCommand } from './start-checkout.command';
import type { CheckoutServiceInterface } from '../../services/interfaces/checkout.service.interface';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

@CommandHandler(StartCheckoutCommand)
export class StartCheckoutHandler
  extends BaseCommandHandler<StartCheckoutCommand, CheckoutResponseDTO>
  implements ICommandHandler<StartCheckoutCommand>
{
  readonly commandType = 'checkout.start';

  constructor(
    private readonly checkoutService: CheckoutServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: StartCheckoutCommand): Promise<CheckoutResponseDTO> {
    return this.checkoutService.start({
      customerId: command.customerId,
      cartId: command.cartId,
    });
  }
}
