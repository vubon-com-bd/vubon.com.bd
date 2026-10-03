/**
 * CategoryResponseDTO
 */
import type { CategoryId, Slug, Url } from '@vubon/shared-types/common';

export interface CategoryResponseDTO {
  readonly id: CategoryId;
  readonly name: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly parentId?: CategoryId;
  readonly path: readonly CategoryId[];
  readonly depth: number;
  readonly status: string;
  readonly imageUrl?: Url;
  readonly iconUrl?: Url;
  readonly sortOrder: number;
  readonly productCount: number;
  readonly isFeatured: boolean;
  readonly hasChildren: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface CategoryTreeResponseDTO extends CategoryResponseDTO {
  readonly children: readonly CategoryTreeResponseDTO[];
}
