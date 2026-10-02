/**
 * IProductCatalogService — Aggregate service combining multiple domains
 */
import type { ProductDetailResponseDTO } from '../../dtos/responses/product-detail-response.dto.js';
import type { ProductListResponseDTO } from '../../dtos/responses/product-list-response.dto.js';

export interface ProductCatalogFilter {
  readonly status?: string;
  readonly type?: string;
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly isFeatured?: boolean;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly inStock?: boolean;
  readonly search?: string;
  readonly tags?: readonly string[];
}

export interface ProductCatalogListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'price' | 'name' | 'totalStock';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ProductCatalogFilter;
}

export const PRODUCT_CATALOG_SERVICE = Symbol('PRODUCT_CATALOG_SERVICE');

export interface IProductCatalogService {
  list(options: ProductCatalogListOptions): Promise<ProductListResponseDTO>;
  getDetail(productId: string): Promise<ProductDetailResponseDTO>;
  getBySlug(slug: string): Promise<ProductDetailResponseDTO | null>;
  listFeatured(limit?: number): Promise<ProductListResponseDTO>;
  listByCategory(categoryId: string, page: number, limit: number): Promise<ProductListResponseDTO>;
}
