export interface TaxRate {
  readonly id: string;
  readonly name: string;
  readonly rate: number;
  readonly country: string;
  readonly region?: string;
}

export interface TaxCalculateRequest {
  readonly amount: number;
  readonly currency: string;
  readonly country: string;
  readonly region?: string;
  readonly productIds?: readonly string[];
}

export interface TaxCalculateResponse {
  readonly subtotal: number;
  readonly taxAmount: number;
  readonly total: number;
  readonly currency: string;
  readonly appliedRates: readonly TaxRate[];
}
