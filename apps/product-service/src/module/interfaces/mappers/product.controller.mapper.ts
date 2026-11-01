/**
 * ProductControllerMapper — HTTP DTO ↔ App DTO
 * @module product-service/interfaces/mappers
 */
import type {
  CreateProductHttpDTO,
  UpdateProductHttpDTO,
  PublishProductHttpDTO,
  ListProductsHttpQueryDTO,
} from '../dtos/requests/product.request.dto.js';

import type {
  CreateProductCommandDTO,
  UpdateProductCommandDTO,
  PublishProductRequestDTO,
} from '../../application/dtos/requests/product/index.js';

import type {
  ProductListOptionsDTO,
  ProductListFilterDTO,
} from '../../application/services/interfaces/product.service.interface.js';

import type {
  ProductResponseDTO,
  ProductPublicResponseDTO,
  ProductSummaryResponseDTO,
  ProductListResponseDTO,
  ProductStatsResponseDTO,
  ProductDetailResponseDTO,
  ProductCreateResponseDTO,
} from '../../application/dtos/responses/product-response.dto.js';

import {
  ProductHttpResponseDTO,
  ProductPublicHttpResponseDTO,
  ProductSummaryHttpResponseDTO,
  ProductListHttpResponseDTO,
  ProductStatsHttpResponseDTO,
  ProductDetailHttpResponseDTO,
  ProductCreateHttpResponseDTO,
} from '../dtos/responses/product.response.dto.js';

export class ProductControllerMapper {
  // ═══ HTTP → App ═══
  static toCreateAppDto(dto: CreateProductHttpDTO): CreateProductCommandDTO {
    return {
      name: dto.name,
      slug: dto.slug,
      sku: dto.sku,
      description: dto.description,
      shortDescription: dto.shortDescription,
      type: dto.type as never,
      categoryId: dto.categoryId,
      brandId: dto.brandId,
      vendorId: dto.vendorId,
      tags: dto.tags,
      images: dto.images,
      price: dto.price,
      compareAtPrice: dto.compareAtPrice,
      currency: dto.currency,
      barcode: dto.barcode,
      weight: dto.weight,
      dimensions: dto.dimensions,
    } as CreateProductCommandDTO;
  }

  static toUpdateAppDto(
    productId: string,
    dto: UpdateProductHttpDTO,
    actorId?: string,
  ): UpdateProductCommandDTO {
    return {
      productId,
      patch: {
        name: dto.name,
        description: dto.description,
        shortDescription: dto.shortDescription,
        status: dto.status as never,
        categoryId: dto.categoryId,
        brandId: dto.brandId,
        tags: dto.tags ? [...dto.tags] : undefined,
        images: dto.images ? [...dto.images] : undefined,
        price: dto.price,
        compareAtPrice: dto.compareAtPrice,
        isFeatured: dto.isFeatured,
      },
      actorId,
    };
  }

  static toPublishAppDto(
    productId: string,
    dto: PublishProductHttpDTO,
    actorId?: string,
  ): PublishProductRequestDTO {
    return {
      productId,
      requireImages: dto.requireImages,
      requireStock: dto.requireStock,
      minStockThreshold: dto.minStockThreshold,
      actorId,
    };
  }

  static toListOptions(q: ListProductsHttpQueryDTO): ProductListOptionsDTO {
    const filter: ProductListFilterDTO = {
      status: q.status,
      type: q.type,
      categoryId: q.categoryId,
      brandId: q.brandId,
      vendorId: q.vendorId,
      isFeatured: q.isFeatured,
      inStock: q.inStock,
      minPrice: q.minPrice,
      maxPrice: q.maxPrice,
      search: q.search,
    };
    return {
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy as never,
      sortDir: q.sortDir,
      filter,
    };
  }

  // ═══ App → HTTP ═══
  static toHttpResponse(app: ProductResponseDTO): ProductHttpResponseDTO {
    return app as unknown as ProductHttpResponseDTO;
  }

  static toPublicHttpResponse(app: ProductPublicResponseDTO): ProductPublicHttpResponseDTO {
    return app as unknown as ProductPublicHttpResponseDTO;
  }

  static toSummaryHttp(app: ProductSummaryResponseDTO): ProductSummaryHttpResponseDTO {
    return app as unknown as ProductSummaryHttpResponseDTO;
  }

  static toListHttp(app: ProductListResponseDTO): ProductListHttpResponseDTO {
    return {
      items: app.items.map((i) => this.toSummaryHttp(i)),
      total: app.total,
      page: app.page,
      limit: app.limit,
      totalPages: app.totalPages,
      hasNext: app.hasNext,
      hasPrev: app.hasPrev,
    };
  }

  static toStatsHttp(app: ProductStatsResponseDTO): ProductStatsHttpResponseDTO {
    return app as unknown as ProductStatsHttpResponseDTO;
  }

  static toDetailHttp(app: ProductDetailResponseDTO): ProductDetailHttpResponseDTO {
    return app as unknown as ProductDetailHttpResponseDTO;
  }

  static toCreateHttp(app: ProductCreateResponseDTO): ProductCreateHttpResponseDTO {
    return app as unknown as ProductCreateHttpResponseDTO;
  }
}
