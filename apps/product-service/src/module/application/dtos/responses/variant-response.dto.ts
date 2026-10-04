/**
 * VariantResponseDTO
 */
import type { ProductId, VariantId, Money, Url } from '@vubon/shared-types/common';

export interface VariantResponseDTO {
  readonly id: VariantId;
  readonly productId: ProductId;
  readonly name: string;
  readonly sku: string;
  readonly barcode?: string;
  readonly options: readonly { readonly name: string; readonly value: string }[];
  readonly price: Money;
  readonly compareAtPrice?: Money;
  readonly cost?: Money;
  readonly weight?: number;
  readonly imageUrl?: Url;
  readonly status: string;
  readonly stock: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}
