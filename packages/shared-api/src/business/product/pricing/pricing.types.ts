export interface ProductPrice {
  readonly productId: string;
  readonly basePrice: number;
  readonly salePrice?: number;
  readonly currency: string;
  readonly discountPercent?: number;
  readonly validUntil?: string;
}

export interface PriceQuoteRequest {
  readonly productId: string;
  readonly quantity: number;
  readonly couponCode?: string;
}

export interface PriceQuoteResponse {
  readonly unitPrice: number;
  readonly subtotal: number;
  readonly discount: number;
  readonly total: number;
  readonly currency: string;
}
