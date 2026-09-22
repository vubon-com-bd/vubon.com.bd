import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateVariantCommand } from './update-variant.command';
import type { ProductVariantServiceInterface } from '../../services/interfaces/product-variant.service.interface';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto';

@CommandHandler(UpdateVariantCommand)
export class UpdateVariantHandler
  extends BaseCommandHandler<UpdateVariantCommand, VariantResponseDTO>
  implements ICommandHandler<UpdateVariantCommand>
{
  readonly commandType = 'product.variant.update';

  constructor(
    private readonly variantService: ProductVariantServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateVariantCommand): Promise<VariantResponseDTO> {
    if (command.price !== undefined) {
      return this.variantService.updatePrice(command.variantId, command.price);
    }
    throw new Error('update-variant not yet wired');
  }
}
