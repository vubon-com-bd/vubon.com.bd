/**
 * ProductIndexer — syncs product entities to the search index.
 * @module product-service/infrastructure/persistence/search/indexers
 */
import { Injectable, Logger, Inject } from '@nestjs/common';
import { SearchClient } from '../search.client.js';
import type { ProductSearchDocument } from '../search-documents.js';
import { searchConfig } from '../../../config/search.config.js';
import { PRODUCT_REPOSITORY, type ProductRepository } from '../../../../domain/repositories/product.repository.interface.js';

export const PRODUCT_INDEXER = Symbol('PRODUCT_INDEXER');

@Injectable()
export class ProductIndexer {
  private readonly logger = new Logger(ProductIndexer.name);
  private readonly indexName = searchConfig.PRODUCT_INDEX;

  constructor(
    private readonly client: SearchClient,
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
  ) {}

  async ensureIndex(): Promise<void> {
    await this.client.ensureIndex(this.indexName, 'id');
    await this.client.updateSettings(this.indexName, {
      searchableAttributes: ['name', 'description', 'shortDescription', 'sku', 'tags'],
      filterableAttributes: [
        'status', 'type', 'categoryId', 'brandId', 'vendorId',
        'isFeatured', 'isPublished', 'price', 'tags', 'totalStock',
      ],
      sortableAttributes: ['price', 'createdAt', 'updatedAt', 'totalStock', 'averageRating'],
      rankingRules: [
        'words', 'typo', 'proximity', 'attribute',
        'sort', 'exactness', 'averageRating:desc',
      ],
    });
  }

  async indexProduct(productId: string): Promise<void> {
    const product = await this.productRepo.findById(productId);
    if (!product) {
      await this.client.deleteDocument(this.indexName, productId);
      return;
    }
    const doc = this.toDocument(product);
    await this.client.upsertDocuments(this.indexName, [doc as unknown as { id: string }]);
    this.logger.debug(`Indexed product ${productId}`);
  }

  async removeProduct(productId: string): Promise<void> {
    await this.client.deleteDocument(this.indexName, productId);
  }

  async reindexAll(): Promise<number> {
    const products = await this.productRepo.findAll();
    if (products.length === 0) return 0;

    await this.client.deleteAllDocuments(this.indexName);
    const docs = products.map((p) => this.toDocument(p));
    for (let i = 0; i < docs.length; i += searchConfig.BATCH_SIZE) {
      const batch = docs.slice(i, i + searchConfig.BATCH_SIZE);
      await this.client.upsertDocuments(this.indexName, batch as unknown as { id: string }[]);
    }
    this.logger.log(`Reindexed ${docs.length} products`);
    return docs.length;
  }

  private toDocument(product: {
    id: string;
    name: { value: string };
    slug: { value: string };
    sku: { value: string };
    type: { value: string };
    status: { value: string };
    description: { value: string };
    shortDescription?: string;
    categoryId: { value: string };
    brandId?: { value: string };
    vendorId?: string;
    price: { amount: number };
    compareAtPrice?: { amount: number };
    tags: readonly string[];
    images: readonly string[];
    thumbnailUrl?: string;
    totalStock: number;
    isFeatured: boolean;
    isPublished: boolean;
    updatedAt: string;
  }): ProductSearchDocument {
    return {
      id: product.id,
      name: product.name.value,
      slug: product.slug.value,
      sku: product.sku.value,
      type: product.type.value,
      status: product.status.value,
      description: product.description.value,
      shortDescription: product.shortDescription ?? '',
      categoryId: product.categoryId.value,
      brandId: product.brandId?.value ?? null,
      vendorId: product.vendorId ?? null,
      price: product.price.amount,
      compareAtPrice: product.compareAtPrice?.amount ?? null,
      currency: 'BDT',
      tags: [...product.tags],
      images: [...product.images],
      thumbnailUrl: product.thumbnailUrl ?? null,
      totalStock: product.totalStock,
      isFeatured: product.isFeatured,
      isPublished: product.isPublished,
      averageRating: 0,
      reviewCount: 0,
      updatedAt: product.updatedAt,
    };
  }
}
