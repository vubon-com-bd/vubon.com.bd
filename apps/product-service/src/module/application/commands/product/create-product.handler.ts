/**
 * CreateProductHandler
 * @module product-service/application/commands/product
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProductCommand } from './create-product.command.js';
import {
  PRODUCT_SERVICE,
  type IProductService,
} from '../../services/interfaces/product.service.interface.js';
import type { ProductCreateResponseDTO } from '../../dtos/responses/product-response.dto.js';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand, ProductCreateResponseDTO>
{
  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly service: IProductService,
  ) {}

  async execute(c: CreateProductCommand): Promise<ProductCreateResponseDTO> {
    return this.service.create(c.dto, c.userId, c.actorId);
  }
}
