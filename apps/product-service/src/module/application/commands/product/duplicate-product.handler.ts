/**
 * DuplicateProductHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DuplicateProductCommand } from './duplicate-product.command.js';
import { PRODUCT_SERVICE, type IProductService } from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@CommandHandler(DuplicateProductCommand)
export class DuplicateProductHandler implements ICommandHandler<DuplicateProductCommand, ProductResponseDTO> {
  constructor(@Inject(PRODUCT_SERVICE) private readonly service: IProductService) {}
  async execute(c: DuplicateProductCommand): Promise<ProductResponseDTO> {
    return this.service.duplicate(c.productId, c.newName, c.actorId);
  }
}
