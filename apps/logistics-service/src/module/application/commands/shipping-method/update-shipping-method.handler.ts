import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateShippingMethodCommand } from './update-shipping-method.command';
import type { ShippingMethodServiceInterface } from '../../services/interfaces/shipping-method.service.interface';
import type { ShippingMethodResponseDTO } from '../../dtos/responses/shipping-method-response.dto';

@CommandHandler(UpdateShippingMethodCommand)
export class UpdateShippingMethodHandler
  extends BaseCommandHandler<UpdateShippingMethodCommand, ShippingMethodResponseDTO>
  implements ICommandHandler<UpdateShippingMethodCommand>
{
  readonly commandType = 'logistics.shipping-method.update';

  constructor(private readonly shippingMethodService: ShippingMethodServiceInterface) {
    super();
  }

  async execute(command: UpdateShippingMethodCommand): Promise<ShippingMethodResponseDTO> {
    return this.shippingMethodService.update({
      methodId: command.methodId,
      name: command.name,
      baseRate: command.baseRate,
      perKgRate: command.perKgRate,
    });
  }
}
