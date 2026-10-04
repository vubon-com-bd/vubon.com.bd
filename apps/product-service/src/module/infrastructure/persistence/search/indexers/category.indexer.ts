/**
 * CategoryIndexer — syncs category entities to search.
 * @module product-service/infrastructure/persistence/search/indexers
 */
import { Injectable, Logger, Inject } from '@nestjs/common';
import { SearchClient } from '../search.client.js';
import type { CategorySearchDocument } from '../search-documents.js';
import { searchConfig } from '../../../config/search.config.js';
import { CATEGORY_REPOSITORY, type CategoryRepository } from '../../../../domain/repositories/category.repository.interface.js';

export const CATEGORY_INDEXER = Symbol('CATEGORY_INDEXER');

@Injectable()
export class CategoryIndexer {
  private readonly logger = new Logger(CategoryIndexer.name);
  private readonly indexName = searchConfig.CATEGORY_INDEX;

  constructor(
    private readonly client: SearchClient,
    @Inject(CATEGORY_REPOSITORY) private readonly categoryRepo: CategoryRepository,
  ) {}

  async ensureIndex(): Promise<void> {
    await this.client.ensureIndex(this.indexName, 'id');
    await this.client.updateSettings(this.indexName, {
      searchableAttributes: ['name', 'description'],
      filterableAttributes: ['status', 'parentId', 'depth', 'isFeatured'],
      sortableAttributes: ['productCount', 'depth'],
    });
  }

  async indexCategory(categoryId: string): Promise<void> {
    const cat = await this.categoryRepo.findById(categoryId);
    if (!cat) {
      await this.client.deleteDocument(this.indexName, categoryId);
      return;
    }
    await this.client.upsertDocuments(this.indexName, [this.toDocument(cat) as unknown as { id: string }]);
  }

  async removeCategory(categoryId: string): Promise<void> {
    await this.client.deleteDocument(this.indexName, categoryId);
  }

  async reindexAll(): Promise<number> {
    const all = await this.categoryRepo.findAll();
    if (all.length === 0) return 0;
    await this.client.deleteAllDocuments(this.indexName);
    const docs = all.map((c) => this.toDocument(c));
    for (let i = 0; i < docs.length; i += searchConfig.BATCH_SIZE) {
      await this.client.upsertDocuments(this.indexName, docs.slice(i, i + searchConfig.BATCH_SIZE) as unknown as { id: string }[]);
    }
    this.logger.log(`Reindexed ${docs.length} categories`);
    return docs.length;
  }

  private toDocument(cat: {
    id: string;
    name: { value: string };
    slug: { value: string };
    description?: string;
    parentId?: { value: string };
    path: { value: readonly string[] };
    depth: number;
    status: string;
    productCount: number;
    isFeatured: boolean;
  }): CategorySearchDocument {
    return {
      id: cat.id,
      name: cat.name.value,
      slug: cat.slug.value,
      description: cat.description ?? '',
      parentId: cat.parentId?.value ?? null,
      path: [...cat.path.value],
      depth: cat.depth,
      status: cat.status,
      productCount: cat.productCount,
      isFeatured: cat.isFeatured,
    };
  }
}
