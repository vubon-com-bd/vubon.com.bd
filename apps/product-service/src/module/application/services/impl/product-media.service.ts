import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { ProductMediaServiceInterface } from '../interfaces/product-media.service.interface';
import type { ProductMediaRepository } from '../../../domain/repositories/product-media.repository.interface';
import { ProductMediaEntity } from '../../../domain/entities/product-media.entity';
import { ProductIdVO } from '../../../domain/value-objects/primitives/product-id.vo';
import { ProductOperationFailedError } from '../../errors/product.errors';

@Injectable()
export class ProductMediaService
  extends BaseService<ProductMediaEntity, string>
  implements ProductMediaServiceInterface
{
  readonly name = 'ProductMediaService';

  constructor(private readonly mediaRepo: ProductMediaRepository) {
    super();
  }

  async add(productId: string, url: string, type: 'image' | 'video' | 'document'): Promise<unknown> {
    const entity = ProductMediaEntity.create({
      productId: ProductIdVO.create(productId),
      url,
      type,
      order: 0,
    });
    await this.mediaRepo.save(entity);
    return entity;
  }

  async remove(mediaId: string): Promise<void> {
    await this.mediaRepo.delete(mediaId);
  }

  async reorder(mediaId: string, order: number): Promise<void> {
    const entity = await this.mediaRepo.findById(mediaId);
    if (!entity) throw new ProductOperationFailedError('media not found');
    const updated = entity.reorder(order);
    await this.mediaRepo.save(updated);
  }

  async listByProduct(productId: string): Promise<readonly unknown[]> {
    return this.mediaRepo.findByProduct(ProductIdVO.create(productId));
  }
}
