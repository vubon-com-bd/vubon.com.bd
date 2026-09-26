/**
 * Brand Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/brand.constants থেকে।
 */

import type { BRAND_STATUS } from '@vubon/shared-constants/business';
import type { BrandId, Slug, Url } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';

export type BrandStatusValue = (typeof BRAND_STATUS)[keyof typeof BRAND_STATUS];

export interface Brand extends BaseEntity<BrandId> {
  readonly name: string;
  readonly slug: Slug;
  readonly description?: string;
  readonly logoUrl?: Url;
  readonly bannerUrl?: Url;
  readonly website?: Url;
  readonly status: BrandStatusValue;
  readonly isFeatured: boolean;
  readonly productCount: number;
  readonly country?: string;
}

export interface BrandPublic {
  readonly id: BrandId;
  readonly name: string;
  readonly slug: Slug;
  readonly logoUrl?: Url;
  readonly productCount: number;
}

export interface BrandCreateInput {
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly logoUrl?: string;
  readonly website?: string;
}
