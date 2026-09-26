/**
 * Collection Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/collection.constants থেকে।
 */

import type { COLLECTION_TYPE, COLLECTION_STATUS } from '@vubon/shared-constants/business';
import type { ProductId, Slug, Url } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';

export type CollectionTypeValue = (typeof COLLECTION_TYPE)[keyof typeof COLLECTION_TYPE];

export type CollectionStatusValue = (typeof COLLECTION_STATUS)[keyof typeof COLLECTION_STATUS];

export interface Collection extends BaseEntity<string> {
  readonly name: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly type: CollectionTypeValue;
  readonly status: CollectionStatusValue;
  readonly imageUrl?: Url;
  readonly bannerUrl?: Url;
  readonly productIds: readonly ProductId[];
  readonly productCount: number;
  readonly isFeatured: boolean;
  readonly sortOrder: number;
  readonly startAt?: string;
  readonly endAt?: string;
}

export interface CollectionPublic {
  readonly id: string;
  readonly name: string;
  readonly slug: Slug;
  readonly imageUrl?: Url;
  readonly productCount: number;
}

export interface CollectionCreateInput {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly type: CollectionTypeValue;
  readonly imageUrl?: string;
  readonly productIds?: readonly ProductId[];
  readonly isFeatured?: boolean;
}
