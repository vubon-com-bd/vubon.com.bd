/**
 * PublishProductHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PublishProductCommand } from './publish-product.command.js';
import { PRODUCT_SERVICE, type IProductService } from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@CommandHandler(PublishProductCommand)
export class PublishProductHandler implements ICommandHandler<PublishProductCommand, ProductResponseDTO> {
  constructor(@Inject(PRODUCT_SERVICE) private readonly service: IProductService) {}
  async execute(c: PublishProductCommand): Promise<ProductResponseDTO> {
    return this.service.publish(c.productId, c.actorId);
  }
}
