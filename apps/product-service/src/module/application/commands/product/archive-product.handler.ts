/**
 * ArchiveProductHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArchiveProductCommand } from './archive-product.command.js';
import { PRODUCT_SERVICE, type IProductService } from '../../services/interfaces/product.service.interface.js';
import type { ProductResponseDTO } from '../../dtos/responses/product-response.dto.js';

@CommandHandler(ArchiveProductCommand)
export class ArchiveProductHandler implements ICommandHandler<ArchiveProductCommand, ProductResponseDTO> {
  constructor(@Inject(PRODUCT_SERVICE) private readonly service: IProductService) {}
  async execute(c: ArchiveProductCommand): Promise<ProductResponseDTO> {
    return this.service.archive(c.productId, c.actorId);
  }
}
