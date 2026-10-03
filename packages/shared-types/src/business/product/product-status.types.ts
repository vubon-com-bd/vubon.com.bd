/**
 * Product Status Value Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/product-status.constants থেকে।
 */

import type { PRODUCT_STATUS } from '@vubon/shared-constants/business';

export type ProductStatusValue = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

export interface ProductStatusMetadata {
  readonly value: ProductStatusValue;
  readonly label: string;
  readonly isPublic: boolean;
  readonly isFinal: boolean;
}
