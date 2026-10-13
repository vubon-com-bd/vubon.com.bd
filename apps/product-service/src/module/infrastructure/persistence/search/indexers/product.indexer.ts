/**
 * ProductIndexer — writes product documents into the search index
 * @module product-service/infrastructure/persistence/search/indexers
 */
import { Injectable, Logger } from '@nestjs/common';
import { SearchService, type SearchIndexDocument } from '../search.service.js';
import type { ProductEntity } from '../../../../domain/entities/product.entity.js';

export const PRODUCT_INDEX = 'products';

@Injectable()
export class ProductIndexer {
  private readonly logger = new Logger(ProductIndexer.name);

  constructor(private readonly searchService: SearchService) {}

  async index(product: ProductEntity): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    const doc = this.toDocument(product);
    await this.searchService.index(PRODUCT_INDEX, doc);
    this.logger.debug(`Indexed product ${product.id}`);
  }

  async reindex(product: ProductEntity): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    await this.remove(product.id);
    await this.index(product);
  }

  async remove(productId: string): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    await this.searchService.remove(PRODUCT_INDEX, productId);
    this.logger.debug(`Removed product ${productId} from index`);
  }

  async indexBatch(products: readonly ProductEntity[]): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    const docs = products.map((p) => this.toDocument(p));
    await this.searchService.indexBatch(PRODUCT_INDEX, docs);
    this.logger.log(`Indexed ${docs.length} products`);
  }

  private toDocument(product: ProductEntity): SearchIndexDocument {
    const vo = product.vo;
    return {
      id: product.id,
      name: vo.name.value,
      slug: vo.slug.value,
      sku: vo.sku.value,
      description: vo.description?.value ?? '',
      shortDescription: vo.shortDescription?.value ?? '',
      type: vo.type.value,
      status: vo.status.value,
      categoryId: vo.categoryId.value,
      brandId: vo.brandId?.value ?? null,
      vendorId: vo.vendorId?.value ?? null,
      tags: vo.tags,
      totalStock: vo.totalStock,
      isFeatured: vo.isFeatured,
      isPublished: vo.isPublished,
      thumbnailUrl: vo.thumbnailUrl ?? null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
