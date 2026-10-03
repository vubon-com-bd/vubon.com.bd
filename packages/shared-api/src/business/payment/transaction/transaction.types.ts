export type TransactionType = 'charge' | 'refund' | 'payout' | 'adjustment';
export type TransactionStatus = 'pending' | 'succeeded' | 'failed';

export interface Transaction {
  readonly id: string;
  readonly paymentId?: string;
  readonly orderId?: string;
  readonly type: TransactionType;
  readonly amount: number;
  readonly currency: string;
  readonly status: TransactionStatus;
  readonly gatewayRef?: string;
  readonly createdAt: string;
}

export interface TransactionListResponse {
  readonly transactions: readonly Transaction[];
  readonly total: number;
}
