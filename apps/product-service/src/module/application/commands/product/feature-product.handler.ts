/**
 * FeatureProductHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FeatureProductCommand } from './feature-product.command.js';
import { PRODUCT_SERVICE, type IProductService } from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@CommandHandler(FeatureProductCommand)
export class FeatureProductHandler implements ICommandHandler<FeatureProductCommand, ProductResponseDTO> {
  constructor(@Inject(PRODUCT_SERVICE) private readonly service: IProductService) {}
  async execute(c: FeatureProductCommand): Promise<ProductResponseDTO> {
    return c.featured
      ? this.service.feature(c.productId, c.actorId)
      : this.service.unfeature(c.productId, c.actorId);
  }
}
