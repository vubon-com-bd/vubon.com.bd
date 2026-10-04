/**
 * CreateProductHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProductCommand } from './create-product.command.js';
import { PRODUCT_SERVICE, type IProductService } from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand, ProductResponseDTO> {
  constructor(@Inject(PRODUCT_SERVICE) private readonly service: IProductService) {}
  async execute(c: CreateProductCommand): Promise<ProductResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
