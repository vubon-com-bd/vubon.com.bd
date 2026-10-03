/**
 * ProductPublicResponseDTO
 */
import type { ProductId, CategoryId, BrandId, Slug, Url, Money } from '@vubon/shared-types/common';

export interface ProductPublicResponseDTO {
  readonly id: ProductId;
  readonly name: string;
  readonly slug: Slug;
  readonly shortDescription?: string;
  readonly type: string;
  readonly status: string;
  readonly categoryId: CategoryId;
  readonly brandId?: BrandId;
  readonly tags: readonly string[];
  readonly images: readonly Url[];
  readonly thumbnailUrl?: Url;
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly currency: string;
  readonly totalStock: number;
  readonly isFeatured: boolean;
}
