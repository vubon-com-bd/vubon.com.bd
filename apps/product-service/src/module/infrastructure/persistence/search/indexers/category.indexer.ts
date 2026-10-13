/**
 * CategoryIndexer — writes category documents into the search index
 * @module product-service/infrastructure/persistence/search/indexers
 */
import { Injectable, Logger } from '@nestjs/common';
import { SearchService, type SearchIndexDocument } from '../search.service.js';
import type { CategoryEntity } from '../../../../domain/entities/category.entity.js';

export const CATEGORY_INDEX = 'categories';

@Injectable()
export class CategoryIndexer {
  private readonly logger = new Logger(CategoryIndexer.name);

  constructor(private readonly searchService: SearchService) {}

  async index(category: CategoryEntity): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    await this.searchService.index(CATEGORY_INDEX, this.toDocument(category));
    this.logger.debug(`Indexed category ${category.id}`);
  }

  async reindex(category: CategoryEntity): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    await this.remove(category.id);
    await this.index(category);
  }

  async remove(categoryId: string): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    await this.searchService.remove(CATEGORY_INDEX, categoryId);
  }

  async indexBatch(categories: readonly CategoryEntity[]): Promise<void> {
    if (!this.searchService.isEnabled()) return;
    const docs = categories.map((c) => this.toDocument(c));
    await this.searchService.indexBatch(CATEGORY_INDEX, docs);
    this.logger.log(`Indexed ${docs.length} categories`);
  }

  private toDocument(category: CategoryEntity): SearchIndexDocument {
    const vo = category.vo;
    return {
      id: category.id,
      name: vo.name.value,
      slug: vo.slug.value,
      description: vo.description ?? '',
      parentId: vo.parentId?.value ?? null,
      depth: vo.depth,
      status: vo.status,
      isFeatured: vo.isFeatured,
      productCount: vo.productCount,
    };
  }
}
