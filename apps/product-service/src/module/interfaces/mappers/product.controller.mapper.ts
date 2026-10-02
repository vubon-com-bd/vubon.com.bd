/**
 * ProductControllerMapper — App DTO ↔ HTTP DTO
 * @module product-service/interfaces/mappers
 */
import type { ProductResponseDTO as AppProductResponseDTO } from '../../application/dtos/responses/product-response.dto.js';
import type { ProductPublicResponseDTO as AppProductPublicDTO } from '../../application/dtos/responses/product-public-response.dto.js';
import { ProductResponseDTO, ProductPublicResponseDTO } from '../dtos/responses/product.response.dto.js';

export class ProductControllerMapper {
  static toHttp(dto: AppProductResponseDTO): ProductResponseDTO {
    const out = new ProductResponseDTO();
    Object.assign(out, {
      id: String(dto.id),
      name: dto.name,
      slug: String(dto.slug),
      sku: dto.sku,
      type: dto.type,
      status: dto.status,
      description: dto.description,
      shortDescription: dto.shortDescription,
      categoryId: String(dto.categoryId),
      brandId: dto.brandId ? String(dto.brandId) : undefined,
      vendorId: dto.vendorId ? String(dto.vendorId) : undefined,
      price: Number(dto.price),
      compareAtPrice: dto.compareAtPrice !== undefined ? Number(dto.compareAtPrice) : undefined,
      currency: dto.currency,
      tags: dto.tags,
      images: dto.images,
      thumbnailUrl: dto.thumbnailUrl ? String(dto.thumbnailUrl) : undefined,
      totalStock: dto.totalStock,
      isFeatured: dto.isFeatured,
      isPublished: dto.isPublished,
      publishedAt: dto.publishedAt,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
    });
    return out;
  }

  static toPublicHttp(dto: AppProductPublicDTO): ProductPublicResponseDTO {
    const out = new ProductPublicResponseDTO();
    Object.assign(out, {
      id: String(dto.id),
      name: dto.name,
      slug: String(dto.slug),
      shortDescription: dto.shortDescription,
      type: dto.type,
      status: dto.status,
      categoryId: String(dto.categoryId),
      brandId: dto.brandId ? String(dto.brandId) : undefined,
      tags: dto.tags,
      images: dto.images,
      thumbnailUrl: dto.thumbnailUrl ? String(dto.thumbnailUrl) : undefined,
      price: Number(dto.price),
      compareAtPrice: dto.compareAtPrice !== undefined ? Number(dto.compareAtPrice) : undefined,
      currency: dto.currency,
      totalStock: dto.totalStock,
      isFeatured: dto.isFeatured,
    });
    return out;
  }

  static toHttpList(dtos: readonly AppProductResponseDTO[]): readonly ProductResponseDTO[] {
    return dtos.map((d) => ProductControllerMapper.toHttp(d));
  }

  static toPublicHttpList(dtos: readonly AppProductPublicDTO[]): readonly ProductPublicResponseDTO[] {
    return dtos.map((d) => ProductControllerMapper.toPublicHttp(d));
  }
}
