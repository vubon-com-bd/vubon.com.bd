/**
 * Product Type Value Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/product-type.constants থেকে।
 */

import type { PRODUCT_TYPE } from '@vubon/shared-constants/business';

export type ProductTypeValue = (typeof PRODUCT_TYPE)[keyof typeof PRODUCT_TYPE];

export interface ProductTypeMetadata {
  readonly value: ProductTypeValue;
  readonly label: string;
  readonly isDigital: boolean;
  readonly requiresShipping: boolean;
}
