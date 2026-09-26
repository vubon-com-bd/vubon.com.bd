export type PromotionStatus = 'draft' | 'active' | 'expired';
export type PromotionKind = 'percent' | 'amount' | 'bogo' | 'free_shipping';

export interface Promotion {
  readonly id: string;
  readonly name: string;
  readonly kind: PromotionKind;
  readonly value: number;
  readonly status: PromotionStatus;
  readonly startsAt: string;
  readonly endsAt?: string;
  readonly code?: string;
}

export interface PromotionListResponse {
  readonly promotions: readonly Promotion[];
  readonly total: number;
}
