import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CalculateShippingCommand } from './calculate-shipping.command';
import { CartCalculationService } from '../../../domain/services/cart-calculation.service';
import type { CartTotalsResponseDTO } from '../../dtos/responses/cart-totals-response.dto';
import { CartOperationFailedError } from '../../errors/cart.errors';

@CommandHandler(CalculateShippingCommand)
export class CalculateShippingHandler
  extends BaseCommandHandler<CalculateShippingCommand, CartTotalsResponseDTO>
  implements ICommandHandler<CalculateShippingCommand>
{
  readonly commandType = 'cart.shipping.calculate';

  constructor(private readonly calcService: CartCalculationService) {
    super();
  }

  async execute(command: CalculateShippingCommand): Promise<CartTotalsResponseDTO> {
    void this.calcService;
    void command;
    throw new CartOperationFailedError('not yet wired');
  }
}
