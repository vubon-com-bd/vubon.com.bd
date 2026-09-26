import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { PublishProductCommand } from './publish-product.command';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@CommandHandler(PublishProductCommand)
export class PublishProductHandler
  extends BaseCommandHandler<PublishProductCommand, ProductResponseDTO>
  implements ICommandHandler<PublishProductCommand>
{
  readonly commandType = 'product.publish';

  constructor(
    private readonly productService: ProductServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: PublishProductCommand): Promise<ProductResponseDTO> {
    return this.productService.publish(command.productId);
  }
}
