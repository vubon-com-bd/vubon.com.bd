/**
 * Search document shapes
 * @module product-service/infrastructure/persistence/search
 */

export interface ProductSearchDocument {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly sku: string;
  readonly type: string;
  readonly status: string;
  readonly description: string;
  readonly shortDescription: string;
  readonly categoryId: string;
  readonly brandId: string | null;
  readonly vendorId: string | null;
  readonly price: number;
  readonly compareAtPrice: number | null;
  readonly currency: string;
  readonly tags: readonly string[];
  readonly images: readonly string[];
  readonly thumbnailUrl: string | null;
  readonly totalStock: number;
  readonly isFeatured: boolean;
  readonly isPublished: boolean;
  readonly averageRating: number;
  readonly reviewCount: number;
  readonly updatedAt: string;
}

export interface CategorySearchDocument {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description: string;
  readonly parentId: string | null;
  readonly path: readonly string[];
  readonly depth: number;
  readonly status: string;
  readonly productCount: number;
  readonly isFeatured: boolean;
}
