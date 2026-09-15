export interface ProductVariant {
  readonly id: string;
  readonly productId: string;
  readonly sku: string;
  readonly name: string;
  readonly attributes: Record<string, string>;
  readonly priceDelta: number;
  readonly inStock: boolean;
}

export interface VariantListResponse {
  readonly variants: readonly ProductVariant[];
}
