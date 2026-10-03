/**
 * ProductResponseDTO
 */
import type { ProductId, CategoryId, BrandId, VendorId, Slug, Url, Money } from '@vubon/shared-types/common';

export interface ProductResponseDTO {
  readonly id: ProductId;
  readonly name: string;
  readonly slug: Slug;
  readonly sku: string;
  readonly type: string;
  readonly status: string;
  readonly description?: string;
  readonly shortDescription?: string;
  readonly categoryId: CategoryId;
  readonly brandId?: BrandId;
  readonly vendorId?: VendorId;
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly currency: string;
  readonly tags: readonly string[];
  readonly images: readonly Url[];
  readonly thumbnailUrl?: Url;
  readonly totalStock: number;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly publishedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
