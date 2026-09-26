import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AddVariantCommand } from './add-variant.command';
import type { ProductVariantServiceInterface } from '../../services/interfaces/product-variant.service.interface';
import type { VariantResponseDTO } from '../../dtos/responses/variant-response.dto';

@CommandHandler(AddVariantCommand)
export class AddVariantHandler
  extends BaseCommandHandler<AddVariantCommand, VariantResponseDTO>
  implements ICommandHandler<AddVariantCommand>
{
  readonly commandType = 'product.variant.add';

  constructor(
    private readonly variantService: ProductVariantServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AddVariantCommand): Promise<VariantResponseDTO> {
    return this.variantService.add(command.productId, {
      productId: command.productId,
      name: command.name,
      sku: command.sku,
      price: command.price,
      type: command.variantType,
      options: command.options.map((o) => ({ name: o.name, value: o.value })),
      weight: command.weight,
      barcode: command.barcode,
    });
  }
}
