/**
 * Variant Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/variant.constants থেকে।
 */

import type { VARIANT_STATUS, VARIANT_TYPE } from '@vubon/shared-constants/business';
import type { ProductId, Money, Url } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';

export type VariantStatusValue = (typeof VARIANT_STATUS)[keyof typeof VARIANT_STATUS];

export type VariantTypeValue = (typeof VARIANT_TYPE)[keyof typeof VARIANT_TYPE];

export interface Variant extends BaseEntity<string> {
  readonly productId: ProductId;
  readonly name: string;
  readonly sku: string;
  readonly barcode?: string;
  readonly type: VariantTypeValue;
  readonly options: readonly VariantOption[];
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly cost?: Money;
  readonly weight?: number;
  readonly imageUrl?: Url;
  readonly status: VariantStatusValue;
  readonly stock: number;
}

export interface VariantOption {
  readonly name: string;
  readonly value: string;
}

export interface VariantPublic {
  readonly id: string;
  readonly name: string;
  readonly sku: string;
  readonly options: readonly VariantOption[];
  readonly price: Money;
  readonly imageUrl?: Url;
  readonly stock: number;
}

export interface VariantCreateInput {
  readonly productId: ProductId;
  readonly name: string;
  readonly sku: string;
  readonly barcode?: string;
  readonly type: VariantTypeValue;
  readonly options: readonly VariantOption[];
  readonly price: number;
  readonly compareAtPrice?: number;
  readonly cost?: number;
  readonly weight?: number;
}
