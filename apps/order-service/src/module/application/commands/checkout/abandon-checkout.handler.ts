import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AbandonCheckoutCommand } from './abandon-checkout.command';
import type { CheckoutServiceInterface } from '../../services/interfaces/checkout.service.interface';

@CommandHandler(AbandonCheckoutCommand)
export class AbandonCheckoutHandler
  extends BaseCommandHandler<AbandonCheckoutCommand, void>
  implements ICommandHandler<AbandonCheckoutCommand>
{
  readonly commandType = 'checkout.abandon';

  constructor(
    private readonly checkoutService: CheckoutServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AbandonCheckoutCommand): Promise<void> {
    await this.checkoutService.abandon(command.checkoutId, command.reason);
  }
}
