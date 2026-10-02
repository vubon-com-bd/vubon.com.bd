/**
 * ProductCatalogService
 */
import { Injectable, Inject } from '@nestjs/common';
import type { IProductCatalogService, ProductCatalogListOptions } from '../interfaces/product-catalog.service.interface.js';
import { PRODUCT_REPOSITORY, type ProductRepository } from '../../../domain/repositories/product.repository.interface.js';
import { ProductMapper } from '../../mappers/product.mapper.js';
import type { ProductListResponseDTO } from '../../dtos/responses/product-list-response.dto.js';
import type { ProductDetailResponseDTO } from '../../dtos/responses/product-detail-response.dto.js';
import { PRODUCT_SERVICE, type IProductService } from '../interfaces/product.service.interface.js';
import { ProductNotFoundApplicationError } from '../../errors/product.errors.js';
import { ProductSlugVO } from '../../../domain/value-objects/primitives/product-slug.vo.js';

@Injectable()
export class ProductCatalogService implements IProductCatalogService {
  constructor(
    @Inject(PRODUCT_REPOSITORY) private readonly productRepo: ProductRepository,
    @Inject(PRODUCT_SERVICE) private readonly productService: IProductService,
  ) {}

  async list(options: ProductCatalogListOptions): Promise<ProductListResponseDTO> {
    const result = await this.productRepo.findPaginated({
      page: options.page,
      limit: options.limit,
      sortBy: options.sortBy,
      sortDir: options.sortDir,
      filter: options.filter,
    });
    return {
      success: true,
      products: ProductMapper.toPublicResponseList(result.items),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }

  async getDetail(productId: string): Promise<ProductDetailResponseDTO> {
    return this.productService.getDetail(productId);
  }

  async getBySlug(slug: string): Promise<ProductDetailResponseDTO | null> {
    const product = await this.productRepo.findBySlug(ProductSlugVO.create(slug));
    if (!product) return null;
    return this.productService.getDetail(product.id);
  }

  async listFeatured(limit = 20): Promise<ProductListResponseDTO> {
    const products = await this.productRepo.findFeatured(limit);
    return {
      success: true,
      products: ProductMapper.toPublicResponseList(products),
      total: products.length,
      page: 1,
      limit,
      totalPages: 1,
    };
  }

  async listByCategory(categoryId: string, page: number, limit: number): Promise<ProductListResponseDTO> {
    const result = await this.productRepo.findPaginated({
      page,
      limit,
      filter: { categoryId },
    });
    if (!result) throw new ProductNotFoundApplicationError(categoryId);
    return {
      success: true,
      products: ProductMapper.toPublicResponseList(result.items),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  }
}
