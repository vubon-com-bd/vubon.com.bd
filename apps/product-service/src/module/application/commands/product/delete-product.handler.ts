import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeleteProductCommand } from './delete-product.command.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<
    DeleteProductCommand,
    { readonly success: true; readonly productId: string }
  >
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(c: DeleteProductCommand) {
    return this.service.delete(c.dto);
  }
}
