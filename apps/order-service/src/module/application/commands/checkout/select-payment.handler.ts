import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SelectPaymentCommand } from './select-payment.command';
import type { CheckoutServiceInterface } from '../../services/interfaces/checkout.service.interface';
import type { CheckoutResponseDTO } from '../../dtos/responses/checkout-response.dto';

@CommandHandler(SelectPaymentCommand)
export class SelectPaymentHandler
  extends BaseCommandHandler<SelectPaymentCommand, CheckoutResponseDTO>
  implements ICommandHandler<SelectPaymentCommand>
{
  readonly commandType = 'checkout.payment.select';

  constructor(
    private readonly checkoutService: CheckoutServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SelectPaymentCommand): Promise<CheckoutResponseDTO> {
    return this.checkoutService.selectPayment(command.checkoutId, command.paymentMethod);
  }
}
