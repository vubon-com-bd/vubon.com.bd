/**
 * CollectionResponseDTO
 */
import type { Slug, Url } from '@vubon/shared-types/common';

export interface CollectionResponseDTO {
  readonly id: string;
  readonly name: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly type: string;
  readonly status: string;
  readonly imageUrl?: Url;
  readonly bannerUrl?: Url;
  readonly productIds: readonly string[];
  readonly productCount: number;
  readonly isFeatured: boolean;
  readonly sortOrder: number;
  readonly startAt?: string;
  readonly endAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}
