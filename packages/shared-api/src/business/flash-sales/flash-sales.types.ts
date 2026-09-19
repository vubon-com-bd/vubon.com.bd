export interface FlashSale {
  readonly id: string;
  readonly name: string;
  readonly startsAt: string;
  readonly endsAt: string;
  readonly discountPercent: number;
  readonly productIds: readonly string[];
}

export interface Deal {
  readonly id: string;
  readonly name: string;
  readonly productId: string;
  readonly discountAmount: number;
  readonly currency: string;
  readonly expiresAt?: string;
}

export interface BundleDeal {
  readonly id: string;
  readonly name: string;
  readonly productIds: readonly string[];
  readonly bundlePrice: number;
  readonly currency: string;
}

export interface ListResponse<T> {
  readonly items: readonly T[];
  readonly total: number;
}
