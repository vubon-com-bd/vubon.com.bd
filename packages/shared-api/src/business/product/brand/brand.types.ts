export interface Brand {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly logoUrl?: string;
}

export interface BrandListResponse {
  readonly brands: readonly Brand[];
}
