/**
 * Category Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/category.constants থেকে।
 */

import type { CATEGORY_STATUS } from '@vubon/shared-constants/business';
import type { CategoryId } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { Slug, Url } from '../../common/primitives';

export type CategoryStatusValue = (typeof CATEGORY_STATUS)[keyof typeof CATEGORY_STATUS];

export interface Category extends BaseEntity<CategoryId> {
  readonly name: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly parentId?: CategoryId;
  readonly path: readonly CategoryId[];
  readonly depth: number;
  readonly status: CategoryStatusValue;
  readonly imageUrl?: Url;
  readonly iconUrl?: Url;
  readonly sortOrder: number;
  readonly productCount: number;
  readonly isFeatured: boolean;
}

export interface CategoryPublic {
  readonly id: CategoryId;
  readonly name: string;
  readonly slug: Slug;
  readonly parentId?: CategoryId;
  readonly imageUrl?: Url;
  readonly productCount: number;
}

export interface CategoryTree extends Category {
  readonly children: readonly CategoryTree[];
}

export interface CategoryCreateInput {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly parentId?: CategoryId;
  readonly imageUrl?: string;
  readonly sortOrder?: number;
}
