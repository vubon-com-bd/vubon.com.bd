/**
 * BrandIndexer
 * @module product-service/infrastructure/persistence/search/indexers
 */
import { Injectable, Logger, Inject } from '@nestjs/common';
import { SearchClient } from '../search.client.js';
import { searchConfig } from '../../../config/search.config.js';
import { BRAND_REPOSITORY, type BrandRepository } from '../../../../domain/repositories/brand.repository.interface.js';

export const BRAND_INDEXER = Symbol('BRAND_INDEXER');

interface BrandSearchDocument {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly logoUrl: string | null;
  readonly status: string;
  readonly isFeatured: boolean;
  readonly productCount: number;
  readonly country: string | null;
}

@Injectable()
export class BrandIndexer {
  private readonly logger = new Logger(BrandIndexer.name);
  private readonly indexName = 'brands';

  constructor(
    private readonly client: SearchClient,
    @Inject(BRAND_REPOSITORY) private readonly brandRepo: BrandRepository,
  ) {}

  async ensureIndex(): Promise<void> {
    await this.client.ensureIndex(this.indexName, 'id');
    await this.client.updateSettings(this.indexName, {
      searchableAttributes: ['name', 'description'],
      filterableAttributes: ['status', 'isFeatured', 'country'],
      sortableAttributes: ['productCount', 'name'],
    });
  }

  async indexBrand(brandId: string): Promise<void> {
    const brand = await this.brandRepo.findById(brandId);
    if (!brand) {
      await this.client.deleteDocument(this.indexName, brandId);
      return;
    }
    const doc: BrandSearchDocument = {
      id: brand.id,
      name: brand.name.value,
      slug: brand.slug.value,
      description: brand.description ?? '',
      logoUrl: brand.logo.value || null,
      status: brand.status,
      isFeatured: brand.isFeatured,
      productCount: brand.productCount,
      country: brand.country ?? null,
    };
    await this.client.upsertDocuments(this.indexName, [doc as unknown as { id: string }]);
  }

  async removeBrand(brandId: string): Promise<void> {
    await this.client.deleteDocument(this.indexName, brandId);
  }

  async reindexAll(): Promise<number> {
    const all = await this.brandRepo.findAll();
    if (all.length === 0) return 0;
    await this.client.deleteAllDocuments(this.indexName);
    const docs: BrandSearchDocument[] = all.map((b) => ({
      id: b.id,
      name: b.name.value,
      slug: b.slug.value,
      description: b.description ?? '',
      logoUrl: b.logo.value || null,
      status: b.status,
      isFeatured: b.isFeatured,
      productCount: b.productCount,
      country: b.country ?? null,
    }));
    for (let i = 0; i < docs.length; i += searchConfig.BATCH_SIZE) {
      await this.client.upsertDocuments(this.indexName, docs.slice(i, i + searchConfig.BATCH_SIZE) as unknown as { id: string }[]);
    }
    this.logger.log(`Reindexed ${docs.length} brands`);
    return docs.length;
  }
}
