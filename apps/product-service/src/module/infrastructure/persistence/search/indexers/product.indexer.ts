import { Injectable } from '@nestjs/common';
import { ProductEntity } from '../../../../domain/entities/product.entity';
import { SearchService } from '../search.service';

@Injectable()
export class ProductIndexer {
  constructor(private readonly search: SearchService) {}

  async index(product: ProductEntity): Promise<void> {
    await this.search.index(product.id.value, {
      name: product.name.value,
      slug: product.slug.value,
      sku: product.sku.value,
      status: product.status.value,
    });
  }

  async remove(productId: string): Promise<void> {
    await this.search.remove(productId);
  }
}
