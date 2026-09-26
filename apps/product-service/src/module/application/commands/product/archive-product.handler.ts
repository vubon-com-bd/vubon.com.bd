import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ArchiveProductCommand } from './archive-product.command';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@CommandHandler(ArchiveProductCommand)
export class ArchiveProductHandler
  extends BaseCommandHandler<ArchiveProductCommand, ProductResponseDTO>
  implements ICommandHandler<ArchiveProductCommand>
{
  readonly commandType = 'product.archive';

  constructor(
    private readonly productService: ProductServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: ArchiveProductCommand): Promise<ProductResponseDTO> {
    return this.productService.archive(command.productId);
  }
}
