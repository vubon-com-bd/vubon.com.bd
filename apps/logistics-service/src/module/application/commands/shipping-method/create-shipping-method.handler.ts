import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateShippingMethodCommand } from './create-shipping-method.command';
import type { ShippingMethodServiceInterface } from '../../services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method-response.dto';

@CommandHandler(CreateShippingMethodCommand)
export class CreateShippingMethodHandler
  extends BaseCommandHandler<CreateShippingMethodCommand, ShippingMethodResponseDTO>
  implements ICommandHandler<CreateShippingMethodCommand>
{
  readonly commandType = 'logistics.shipping-method.create';

  constructor(private readonly shippingMethodService: ShippingMethodServiceInterface) {
    super();
  }

  async execute(command: CreateShippingMethodCommand): Promise<ShippingMethodResponseDTO> {
    return this.shippingMethodService.create({
      name: command.name,
      type: command.methodType,
      baseRate: command.baseRate,
      perKgRate: command.perKgRate,
      currency: command.currency,
      estimatedDays: command.estimatedDays,
    } as never);
  }
}
