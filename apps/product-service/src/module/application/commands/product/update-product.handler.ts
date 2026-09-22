import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateProductCommand } from './update-product.command';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  extends BaseCommandHandler<UpdateProductCommand, ProductResponseDTO>
  implements ICommandHandler<UpdateProductCommand>
{
  readonly commandType = 'product.update';

  constructor(
    private readonly productService: ProductServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdateProductCommand): Promise<ProductResponseDTO> {
    return this.productService.update(command.productId, {
      name: command.name,
      categoryId: command.categoryId ?? undefined,
      brandId: command.brandId ?? undefined,
    });
  }
}
