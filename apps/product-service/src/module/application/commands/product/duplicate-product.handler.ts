import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DuplicateProductCommand } from './duplicate-product.command';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@CommandHandler(DuplicateProductCommand)
export class DuplicateProductHandler
  extends BaseCommandHandler<DuplicateProductCommand, ProductResponseDTO>
  implements ICommandHandler<DuplicateProductCommand>
{
  readonly commandType = 'product.duplicate';

  constructor(
    private readonly productService: ProductServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DuplicateProductCommand): Promise<ProductResponseDTO> {
    void command;
    void this.productService;
    throw new Error('duplicate-product not yet wired');
  }
}
