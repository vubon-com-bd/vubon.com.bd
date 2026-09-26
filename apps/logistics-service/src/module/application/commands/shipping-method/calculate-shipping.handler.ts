import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CalculateShippingCommand } from './calculate-shipping.command';
import type { ShippingMethodServiceInterface } from '../../services/interfaces/shipping-method.service.interface';

@CommandHandler(CalculateShippingCommand)
export class CalculateShippingHandler
  extends BaseCommandHandler<
    CalculateShippingCommand,
    { rate: number; currency: string }
  >
  implements ICommandHandler<CalculateShippingCommand>
{
  readonly commandType = 'logistics.shipping-method.calculate';

  constructor(private readonly shippingMethodService: ShippingMethodServiceInterface) {
    super();
  }

  async execute(command: CalculateShippingCommand): Promise<{ rate: number; currency: string }> {
    return this.shippingMethodService.calculate({
      methodId: command.methodId,
      courierId: command.courierId,
      zoneId: command.zoneId,
      weightKg: command.weightKg,
      declaredValue: command.declaredValue,
    });
  }
}
