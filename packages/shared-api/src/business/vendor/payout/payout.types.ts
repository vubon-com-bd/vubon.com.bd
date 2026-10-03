export type PayoutStatus = 'requested' | 'processing' | 'paid' | 'failed';

export interface Payout {
  readonly id: string;
  readonly vendorId: string;
  readonly amount: number;
  readonly currency: string;
  readonly status: PayoutStatus;
  readonly method: string;
  readonly requestedAt: string;
  readonly paidAt?: string;
}

export interface PayoutListResponse {
  readonly payouts: readonly Payout[];
  readonly total: number;
}
