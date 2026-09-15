export type AffiliateStatus = 'pending' | 'active' | 'suspended';

export interface Affiliate {
  readonly id: string;
  readonly userId: string;
  readonly code: string;
  readonly status: AffiliateStatus;
  readonly commissionRate: number;
  readonly totalEarned: number;
  readonly currency: string;
  readonly createdAt: string;
}

export interface RegisterAffiliateRequest {
  readonly payoutMethod: string;
  readonly payoutDetails: Record<string, string>;
  readonly website?: string;
}

export interface AffiliateListResponse {
  readonly affiliates: readonly Affiliate[];
  readonly total: number;
}
