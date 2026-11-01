/**
 * ProductSearchService — Real business logic
 * @module product-service/domain/services
 *
 * Responsibilities:
 *  - Query normalization
 *  - Token extraction
 *  - Relevance scoring (name match > tag match > description match)
 *  - Filter predicate
 */
import type { ProductEntity } from '../entities/product.entity.js';

export interface SearchQuery {
  readonly term: string;
  readonly normalized: string;
  readonly tokens: readonly string[];
}

export interface SearchScoreBreakdown {
  readonly nameScore: number;
  readonly tagScore: number;
  readonly descriptionScore: number;
  readonly skuScore: number;
  readonly total: number;
}

export interface SearchFilterInput {
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly tags?: readonly string[];
  readonly inStockOnly?: boolean;
}

export class ProductSearchService {
  /**
   * Term normalize — lowercase + trim + dedupe tokens।
   */
  static normalizeQuery(term: string): SearchQuery {
    const normalized = term.trim().toLowerCase().replace(/\s+/g, ' ');
    const tokens = Array.from(new Set(normalized.split(' ').filter((t) => t.length >= 2)));
    return { term, normalized, tokens };
  }

  /**
   * Relevance score — weighted fields।
   */
  static score(product: ProductEntity, query: SearchQuery): SearchScoreBreakdown {
    if (query.tokens.length === 0) {
      return { nameScore: 0, tagScore: 0, descriptionScore: 0, skuScore: 0, total: 0 };
    }

    const vo = product.vo;
    const name = vo.name.value.toLowerCase();
    const sku = vo.sku.value.toLowerCase();
    const description = vo.description?.value.toLowerCase() ?? '';
    const tags = vo.tags.map((t) => t.toLowerCase());

    let nameScore = 0;
    let tagScore = 0;
    let descriptionScore = 0;
    let skuScore = 0;

    for (const token of query.tokens) {
      if (name === token) nameScore += 100;
      else if (name.startsWith(token)) nameScore += 50;
      else if (name.includes(token)) nameScore += 20;

      if (tags.some((t) => t === token)) tagScore += 40;
      else if (tags.some((t) => t.includes(token))) tagScore += 15;

      if (description.includes(token)) descriptionScore += 5;

      if (sku.includes(token)) skuScore += 30;
    }

    const total = nameScore + tagScore + descriptionScore + skuScore;
    return { nameScore, tagScore, descriptionScore, skuScore, total };
  }

  /**
   * Filter predicate।
   */
  static passesFilter(product: ProductEntity, filter: SearchFilterInput): boolean {
    const vo = product.vo;

    if (filter.categoryId && vo.categoryId.value !== filter.categoryId) return false;
    if (filter.brandId && vo.brandId?.value !== filter.brandId) return false;
    if (filter.vendorId && vo.vendorId?.value !== filter.vendorId) return false;
    if (filter.inStockOnly && vo.totalStock <= 0) return false;

    if (filter.tags && filter.tags.length > 0) {
      const productTags = vo.tags.map((t) => t.toLowerCase());
      const required = filter.tags.map((t) => t.toLowerCase());
      if (!required.every((t) => productTags.includes(t))) return false;
    }

    return true;
  }

  /**
   * Sort by relevance → multi-key sort।
   */
  static rankByRelevance(
    products: readonly ProductEntity[],
    query: SearchQuery,
  ): readonly ProductEntity[] {
    const scored = products.map((p) => ({ product: p, score: this.score(p, query).total }));
    scored.sort((a, b) => b.score - a.score);
    return scored.map((s) => s.product);
  }

  /**
   * Term-containing tokens count — match quality।
   */
  static matchCount(product: ProductEntity, query: SearchQuery): number {
    const haystack = [
      product.vo.name.value,
      product.vo.sku.value,
      product.vo.description?.value ?? '',
      product.vo.tags.join(' '),
    ].join(' ').toLowerCase();

    return query.tokens.filter((t) => haystack.includes(t)).length;
  }
}
