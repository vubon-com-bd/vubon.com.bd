/**
 * ProductMapper — Entity ↔ Response DTO
 */
import { ProductEntity } from '../../domain/entities/product.entity.js';
import type { ProductResponseDTO } from '../dtos/responses/product-response.dto.js';
import type { ProductPublicResponseDTO } from '../dtos/responses/product-public-response.dto.js';
import type { ProductId, CategoryId, BrandId, VendorId, Slug, Url, Money } from '@vubon/shared-types/common';

export class ProductMapper {
  static toResponse(product: ProductEntity): ProductResponseDTO {
    return {
      id: product.id as ProductId,
      name: product.name.value,
      slug: product.slug.value as Slug,
      sku: product.sku.value,
      type: product.type.value,
      status: product.status.value,
      description: product.description.value || undefined,
      shortDescription: product.shortDescription,
      categoryId: product.categoryId.value as CategoryId,
      brandId: product.brandId?.value as BrandId | undefined,
      vendorId: product.vendorId as VendorId | undefined,
      price: product.price.amount as Money,
      compareAtPrice: product.compareAtPrice ? (product.compareAtPrice.amount as Money) : undefined,
      currency: product.price.currency,
      tags: product.tags,
      images: product.images as readonly Url[],
      thumbnailUrl: product.thumbnailUrl as Url | undefined,
      totalStock: product.totalStock,
      isFeatured: product.isFeatured,
      isPublished: product.isPublished,
      publishedAt: product.publishedAt,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }

  static toPublicResponse(product: ProductEntity): ProductPublicResponseDTO {
    return {
      id: product.id as ProductId,
      name: product.name.value,
      slug: product.slug.value as Slug,
      shortDescription: product.shortDescription,
      type: product.type.value,
      status: product.status.value,
      categoryId: product.categoryId.value as CategoryId,
      brandId: product.brandId?.value as BrandId | undefined,
      tags: product.tags,
      images: product.images as readonly Url[],
      thumbnailUrl: product.thumbnailUrl as Url | undefined,
      price: product.price.amount as Money,
      compareAtPrice: product.compareAtPrice ? (product.compareAtPrice.amount as Money) : undefined,
      currency: product.price.currency,
      totalStock: product.totalStock,
      isFeatured: product.isFeatured,
    };
  }

  static toResponseList(products: readonly ProductEntity[]): readonly ProductResponseDTO[] {
    return products.map((p) => ProductMapper.toResponse(p));
  }

  static toPublicResponseList(products: readonly ProductEntity[]): readonly ProductPublicResponseDTO[] {
    return products.map((p) => ProductMapper.toPublicResponse(p));
  }
}
