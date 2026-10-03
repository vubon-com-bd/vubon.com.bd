/**
 * SearchIndexerService — facade over search indexers for use by other layers.
 * @module product-service/infrastructure/services/external
 */
import { Injectable, Logger } from '@nestjs/common';
import { ProductIndexer } from '../../persistence/search/indexers/product.indexer.js';
import { CategoryIndexer } from '../../persistence/search/indexers/category.indexer.js';
import { BrandIndexer } from '../../persistence/search/indexers/brand.indexer.js';

export const SEARCH_INDEXER_SERVICE = Symbol('SEARCH_INDEXER_SERVICE');

@Injectable()
export class SearchIndexerService {
  private readonly logger = new Logger(SearchIndexerService.name);

  constructor(
    private readonly productIndexer: ProductIndexer,
    private readonly categoryIndexer: CategoryIndexer,
    private readonly brandIndexer: BrandIndexer,
  ) {}

  async ensureIndices(): Promise<void> {
    await Promise.all([
      this.productIndexer.ensureIndex(),
      this.categoryIndexer.ensureIndex(),
      this.brandIndexer.ensureIndex(),
    ]);
  }

  async indexProduct(productId: string): Promise<void> {
    try {
      await this.productIndexer.indexProduct(productId);
    } catch (err) {
      this.logger.error(`Product index failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async removeProduct(productId: string): Promise<void> {
    try {
      await this.productIndexer.removeProduct(productId);
    } catch (err) {
      this.logger.error(`Product remove failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async indexCategory(categoryId: string): Promise<void> {
    try {
      await this.categoryIndexer.indexCategory(categoryId);
    } catch (err) {
      this.logger.error(`Category index failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async indexBrand(brandId: string): Promise<void> {
    try {
      await this.brandIndexer.indexBrand(brandId);
    } catch (err) {
      this.logger.error(`Brand index failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async reindexAll(): Promise<{ products: number; categories: number; brands: number }> {
    const [products, categories, brands] = await Promise.all([
      this.productIndexer.reindexAll(),
      this.categoryIndexer.reindexAll(),
      this.brandIndexer.reindexAll(),
    ]);
    return { products, categories, brands };
  }
}
