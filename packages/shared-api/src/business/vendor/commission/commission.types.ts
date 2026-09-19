export type CommissionStatus = 'pending' | 'approved' | 'paid';

export interface Commission {
  readonly id: string;
  readonly vendorId: string;
  readonly orderId: string;
  readonly amount: number;
  readonly currency: string;
  readonly rate: number;
  readonly status: CommissionStatus;
  readonly createdAt: string;
}

export interface CommissionListResponse {
  readonly commissions: readonly Commission[];
  readonly total: number;
}
