import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateProductCommand } from './create-product.command';
import type { ProductServiceInterface } from '../../services/interfaces/product.service.interface';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  extends BaseCommandHandler<CreateProductCommand, ProductResponseDTO>
  implements ICommandHandler<CreateProductCommand>
{
  readonly commandType = 'product.create';

  constructor(
    private readonly productService: ProductServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreateProductCommand): Promise<ProductResponseDTO> {
    void command;
    void this.productService;
    throw new Error('create-product not yet wired');
  }
}
