/**
 * IProductService — contract
 * @module product-service/application/services/interfaces
 *
 * Pattern: Symbol-based DI token + rich contract
 */
import type {
  CreateProductCommandDTO,
  UpdateProductCommandDTO,
  DeleteProductRequestDTO,
  PublishProductRequestDTO,
  ArchiveProductRequestDTO,
  DuplicateProductRequestDTO,
} from '../../dtos/requests/product/index.js';
import type {
  ProductResponseDTO,
  ProductPublicResponseDTO,
  ProductSummaryResponseDTO,
  ProductListResponseDTO,
  ProductStatsResponseDTO,
  ProductDetailResponseDTO,
  ProductCreateResponseDTO,
} from '../../dtos/responses/product-response.dto.js';

// ─── DI Token ─────────────────────────────
export const PRODUCT_SERVICE = Symbol('PRODUCT_SERVICE');

// ─── Filter / Options ─────────────────────
export interface ProductListFilterDTO {
  readonly status?: string | readonly string[];
  readonly type?: string | readonly string[];
  readonly categoryId?: string;
  readonly brandId?: string;
  readonly vendorId?: string;
  readonly isFeatured?: boolean;
  readonly isPublished?: boolean;
  readonly inStock?: boolean;
  readonly minPrice?: number;
  readonly maxPrice?: number;
  readonly search?: string;
  readonly tags?: readonly string[];
}

export interface ProductListOptionsDTO {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'price' | 'totalStock';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ProductListFilterDTO;
  readonly includeDeleted?: boolean;
}

// ─── Main Interface ───────────────────────
export interface IProductService {
  // Commands
  create(dto: CreateProductCommandDTO, userId: string, actorId?: string): Promise<ProductCreateResponseDTO>;
  update(dto: UpdateProductCommandDTO, actorId?: string): Promise<ProductResponseDTO>;
  delete(dto: DeleteProductRequestDTO): Promise<{ readonly success: true; readonly productId: string }>;
  publish(dto: PublishProductRequestDTO): Promise<ProductResponseDTO>;
  archive(dto: ArchiveProductRequestDTO): Promise<ProductResponseDTO>;
  duplicate(dto: DuplicateProductRequestDTO): Promise<ProductCreateResponseDTO>;

  // Queries
  getById(id: string): Promise<ProductResponseDTO>;
  getBySlug(slug: string): Promise<ProductResponseDTO>;
  getPublic(id: string): Promise<ProductPublicResponseDTO>;
  getDetail(id: string): Promise<ProductDetailResponseDTO>;
  list(options: ProductListOptionsDTO): Promise<ProductListResponseDTO>;
  search(term: string, limit?: number): Promise<readonly ProductSummaryResponseDTO[]>;
  getFeatured(limit?: number): Promise<readonly ProductSummaryResponseDTO[]>;
  getRelated(productId: string, limit?: number): Promise<readonly ProductSummaryResponseDTO[]>;
  getStats(filter?: ProductListFilterDTO): Promise<ProductStatsResponseDTO>;
}
