import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ConfirmCheckoutCommand } from './confirm-checkout.command';
import type { CheckoutServiceInterface } from '../../services/interfaces/checkout.service.interface';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

@CommandHandler(ConfirmCheckoutCommand)
export class ConfirmCheckoutHandler
  extends BaseCommandHandler<ConfirmCheckoutCommand, CheckoutResponseDTO>
  implements ICommandHandler<ConfirmCheckoutCommand>
{
  readonly commandType = 'checkout.confirm';

  constructor(
    private readonly checkoutService: CheckoutServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ConfirmCheckoutCommand): Promise<CheckoutResponseDTO> {
    return this.checkoutService.confirm(command.checkoutId);
  }
}
