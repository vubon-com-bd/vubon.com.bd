/**
 * UnpublishProductHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnpublishProductCommand } from './unpublish-product.command.js';
import { PRODUCT_SERVICE, type IProductService } from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@CommandHandler(UnpublishProductCommand)
export class UnpublishProductHandler implements ICommandHandler<UnpublishProductCommand, ProductResponseDTO> {
  constructor(@Inject(PRODUCT_SERVICE) private readonly service: IProductService) {}
  async execute(c: UnpublishProductCommand): Promise<ProductResponseDTO> {
    return this.service.unpublish(c.productId, c.actorId, c.reason);
  }
}
